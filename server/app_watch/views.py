from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
import json
from django.conf import settings
from django.contrib.auth import authenticate, login, logout
import requests
from rest_framework.decorators import api_view
from .models import *

##WATCHMODE API INFO
api_key = settings.API_KEY
api_key_str = '?apiKey='+api_key
url = "https://api.watchmode.com/v1/"

##GLOBAL VARIABLES##
app = open('static/index.html').read()
# person = Person.objects.get(watchmode_id=73836).imdb_id

#     # print(response.json())
##LOGIN PAGE & LOGIN USER METHOD##
@api_view(["GET", "POST"])
def login_user_view(request):
    if request.method == 'GET':
        
        # for i in range(1,11):
        #     print(i)
        #     movie = PopularMovies.objects.get(id=i)
        #     #response = requests.get(f"https://api.watchmode.com/v1/title/{movie.movie_id}/details/{api_key_str}&&append_to_response=sources")
        #     res = json.dumps(requests.get(f"http://www.omdbapi.com/?i={movie.imdb_id}&apikey=afa96401").json())
        #     print(res)
            # dates = res.json()
            # if dates['Response']:
            #     print(dates)
            
            ##response = requests.get(url+'list-titles/'+api_key_str+'&sort_by=popularity_desc&types=movie')
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
                    return JsonResponse({'data': data})
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
        if request.user:
            print('made it!')
            print(request.user)
            return HttpResponse(app)
    

@api_view(['GET'])
def logged_in(request):
    if request.method == 'GET':
        movie_dets = []
        with open('./fixtures/omdata.json') as f:
            movies= json.load(f)
            #print(movies)
            f.close()
       
        return JsonResponse({'success': True, 'data':movies})

@api_view(['GET'])
def logout_user(request):
    if request.method == 'GET':
        logout(request._request)
        print('logged out!!')
        return JsonResponse({'success':True})


def whoami(request):
    if request.user.is_authenicated:
        return JsonResponse({
            'email': request.user.email,
        })
    else:
        return JsonResponse({'email': None})
