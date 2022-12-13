from django.contrib import admin
from django.urls import path, re_path
from . import views 

urlpatterns = [
    path('', views.login_user_view),
    path('api/login_user/', views.login_user_view), 
    path('api/signup_user/', views.signup_user_view),
    path('signup/', views.signup_user_view),
    
    path('api/userhomepage/', views.logged_in),
    path('userhomepage/', views.homepage),

     #re_path(r'.*', views.index)
]
