from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
import json
from django.conf import settings
from django.contrib.auth import authenticate, login, logout
import requests
from rest_framework.decorators import api_view
from .models import *

# Create your views here.
api_key = settings.API_KEY
api_key_str = '?apiKey='+api_key
url = "https://api.watchmode.com/v1/"

##LOGIN##


@api_view(["GET", "POST"])
def login_user_view(request):
    if request.method == 'GET':
        app = open('static/index.html').read()
        person = Person.objects.get(watchmode_id=73836).imdb_id
        #response = requests.get(url+'list-titles/'+api_key_str+'&sort_by=popularity_desc&types=movie')
        # print(response.json())
    elif request.method == 'POST':
        data = request.data
        print(data)
        email = data['email']
        password = data['password']
        user = authenticate(username=email, password=password)
        print(email)
        if user is not None:
            if user.is_active:
                try:
                    login(request._request, user)
                    print('logged in!')
                    return JsonResponse({'data': data})
                except Exception as e:
                    return JsonResponse({'success': False, 'reason': 'login failed'})
            else:
                return JsonResponse({'success': False, 'reason': 'account disabled'})
        else:
            return JsonResponse({'success': False, 'reason': 'user does not exist'})

    return HttpResponse(app)
    # return JsonResponse({'request':response.json()})

##SIGN-UP PAGE##


@api_view(["GET", "POST"])
def signup_user_view(request):
    if request.method == 'GET':
        app = open('static/index.html').read()
        return HttpResponse(app)

    elif request.method == 'POST':
        new_user_info = (request.data)
        print(new_user_info)
        try:
            AppUser.objects.create_user(first_name=new_user_info['firstname'], last_name=new_user_info['lastname'],
                                        username=new_user_info['email'], password=new_user_info['password'], email=new_user_info['email'])
            return JsonResponse({'success': True, 'new_user': new_user_info['email']})
        except Exception as e:
            print(f'error: {e}<')
            return JsonResponse({'success': False, 'error': 'error'})
        

@api_view(["GET"])
def homepage(request):
    print('made it!')
    app = open('static/index.html').read()
    return HttpResponse(app)


@api_view(['GET'])
def logged_in(request):
    if request.method == 'GET':
        print(request.user.email)

        return JsonResponse({'success': True})


def logout_user(request):
    logout(request._request)
    return HttpResponseRedirect('/')


def whoami(request):
    if request.user.is_authenicated:
        return JsonResponse({
            'email': request.user.email,
        })
    else:
        return JsonResponse({'email': None})
