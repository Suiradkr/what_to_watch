from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.conf import settings
import requests
from .models import *

# Create your views here.
api_key = settings.API_KEY
api_key_str = '?apiKey='+api_key
url = "https://api.watchmode.com/v1/"

def index (request):
    homepage = open('static/index.html').read()
    person = Person.objects.get(watchmode_id=73836).imdb_id
    #response = requests.get((url+'person/73836'+api_key_str))
    print(person)
    return HttpResponse(response)
    #return JsonResponse({'data':person})