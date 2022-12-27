from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
import json
from django.conf import settings
from django.contrib.auth import authenticate, login, logout
import requests
from rest_framework.decorators import api_view
from .models import *
import random


##WATCHMODE API INFO
api_key = settings.API_KEY
api_key_str = '?apiKey='+api_key
url = "https://api.watchmode.com/v1/title/"
om_key = settings.OMAPI_KEY
om_url = "http://www.omdbapi.com/?i="

##GLOBAL VARIABLES##
app = open('static/index.html').read()


##LOGIN PAGE & LOGIN USER METHOD##
@api_view(["GET", "POST"])
def login_user_view(request):
    if request.method == 'GET':
        return HttpResponse(app)
    elif request.method == 'POST':
        data = request.data
        email = data['email']
        password = data['password']
        user = authenticate(username=email, password=password)
        if user is not None:
            if user.is_active:
                try:
                    login(request._request, user)
                    print('user logged in!')
                    user_info = AppUser.objects.get(email=email)
                    print(user_info)
                    
                    return JsonResponse({'success': True, 'user':user_info.first_name})
                except Exception as e:
                    return JsonResponse({'success': False, 'reason': 'login failed'})
            else:
                return JsonResponse({'success': False, 'reason': 'account disabled'})
        else:
            return JsonResponse({'success': False, 'reason': 'user does not exist'})
    return JsonResponse({'wrong request method':request.method})

##SIGN-UP PAGE & SIGN-UP METHOD##
@api_view(["GET", "POST"])
def signup_user_view(request):
    if request.method == 'GET':
        return HttpResponse(app)
    elif request.method == 'POST':
        new_user_info = request.data
        print(new_user_info)
        try:
            AppUser.objects.create_user(first_name=new_user_info['firstname'], last_name=new_user_info['lastname'],
                username=new_user_info['email'], password=new_user_info['password'], email=new_user_info['email'])
            return JsonResponse({'success': True, 'new_user': new_user_info['email']})
        except Exception as e:
            print(f'error: {e}<')
            return JsonResponse({'success': False, 'error': 'error'})
    return JsonResponse({'success': False, 'error': 'wrong request method'})
        
##USER'S HOMEPAGE##
@api_view(["GET"])
def user_homepage(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            print('made it!')
            print(request.user)
            return HttpResponse(app)
        return HttpResponseRedirect(redirect_to='/')
    

@api_view(['GET'])
def movie_data(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            with open('./fixtures/omdata.json') as f:
                movies= json.load(f)
                f.close()
           
            return JsonResponse({'success': True, 'data':movies})
        else:
            return JsonResponse({'success':False, 'user':'not logged in'})

@api_view(['GET'])
def tv_data(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            with open('./fixtures/tvshows.json') as t:
                shows= json.load(t)
                t.close()
            return JsonResponse({'success': True, 'data':shows})
        else:
            return JsonResponse({'success':False, 'user':'not logged in'})
            
@api_view(['GET'])
def logout_user(request):
    if request.method == 'GET':
        logout(request._request)
        print('logged out!!')
        return JsonResponse({'success':True})

@api_view(['GET'])
def whoami(request):
    if request.user.is_authenticated:
        print(request.user.last_name)
        return JsonResponse({
            'email': request.user.email,
            'fname': request.user.first_name,
            'lname': request.user.last_name,
        })
    else:
        return JsonResponse({'user': None})

@api_view(['GET'])
def user_accountpage(request):
    if request.method == 'GET':
        print("user account page!!!")
        return HttpResponse(app)

@api_view(['GET'])
def all_movies(request):
    if request.method == 'GET':
        return HttpResponse(app)

@api_view(['GET'])
def all_tvshows(request):
    if request.method == 'GET':
        return HttpResponse(app)

@api_view(['GET', 'POST', 'DELETE'])
def favorite_movies(request):
    if request.method == 'GET':
        user = AppUser.objects.get(email=request.user.email)
        fav_list = user.favoritefilms_set.all()
        print(fav_list)
        favorite = []
        fav_film_info = []
        for films in fav_list:
            favorite.append(films.film_id)
        with open('./fixtures/omdata.json') as f:
            movies= json.load(f)
            f.close()
            for movie in movies:
                if movie['imdbID'] in favorite:
                    fav_film_info.append(movie)
        with open('./fixtures/tvshows.json') as t:
            shows = json.load(t)
            t.close()
            for show in shows:
                if show['imdbID'] in favorite:
                    fav_film_info.append(show)
        return JsonResponse({'list':fav_film_info})
    if request.method == 'POST':
        user = AppUser.objects.get(email=request.user.email)
        try: 
            if FavoriteFilms.objects.get(user_id=user, film_id=request.data['film_id']):
                return JsonResponse({'success':False, 'error':'This film is already in your favorites'})
        except:
            FavoriteFilms.objects.create(user_id=user, film_id=request.data['film_id'])
            return JsonResponse({'success':True})
    if request.method == 'DELETE':
        print(request.data['film_id'])
        user = AppUser.objects.get(email=request.user.email)
        remove_from_list = FavoriteFilms.objects.get(user_id=user, film_id=request.data['film_id'])
        remove_from_list.delete()
        return JsonResponse({'success':True})

@api_view(['GET'])
def favorite_movies_view(request):
    if request.method == 'GET':
        return HttpResponse(app)

@api_view(['POST'])
def favorites_list(request):
    in_list = False
    if request.method == 'POST':
        user = AppUser.objects.get(email=request.user.email)
        fav_list = user.favoritefilms_set.all()
        print(request.data['id'])
        favorite = []
        for films in fav_list:
            favorite.append(films.film_id)
        if request.data['id'] in favorite:
            in_list = True
    return JsonResponse({'in_list':in_list})

@api_view(['POST'])
def get_film_details(request):
    if request.method == 'POST':
        response = requests.get(f"{url}{request.data['id']}/details/{api_key_str}&append_to_response=sources")
        return JsonResponse({'details':response.json()})
      
@api_view(['GET','POST'])
def search_film(request):
    if request.method == 'GET':
        return HttpResponse(app)
    if request.method == 'POST':
        response = requests.get(f"https://api.watchmode.com/v1/autocomplete-search/{api_key_str}&search_value={request.data['search']}&search_type=2")
       
        return JsonResponse({'data':(response.json())['results']})

@api_view(['GET','POST'])
def generate_film(request): 
    if request.method == 'GET':
        
        with open('./fixtures/genres.json') as g:
            genres= json.load(g)
            g.close()
        
        return JsonResponse({'genres':genres})
    if request.method == 'POST':
        if len(request.data['genres']) == 0:
            response = requests.get(f"https://api.watchmode.com/v1/list-titles/{api_key_str}&types=movies,tv_series")
            random_num = random.randint(0, len((response.json())['titles']))
            print((response.json())['titles'][random_num])
            film_id = (response.json())['titles'][random_num]['imdb_id']
            new_response = requests.get(f"{om_url}{film_id}{om_key}")
            return JsonResponse({'film':new_response.json()})
        else:
            genres = ''
            for genre in request.data['genres']:
                genres += f"{genre['id']},"
            print(genres)
            response = requests.get(f"https://api.watchmode.com/v1/list-titles/{api_key_str}&types=movies,tv_series&genres={genres}")
            print((response.json()))
            random_num = random.randint(0, len((response.json())['titles']))
            print((response.json())['titles'][random_num])
            film_id = (response.json())['titles'][random_num]['imdb_id']
            new_response = requests.get(f"{om_url}{film_id}{om_key}")
            
        return JsonResponse({'film':new_response.json()})

@api_view(['POST'])
def search_details(request):
    if request.method == 'POST':
        response = requests.get(f"{url}{request.data['id']}/details/{api_key_str}&append_to_response=sources")
        print(request.data)
        print(response.json())
        return JsonResponse({'data':response.json()})
