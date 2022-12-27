from django.contrib import admin
from django.urls import path, re_path
from . import views 

urlpatterns = [
    path('', views.login_user_view),
    path('api/login_user/', views.login_user_view), 
    path('api/signup_user/', views.signup_user_view),
    path('signup/', views.signup_user_view),
    path('api/moviedata/', views.movie_data),
    path('api/tvdata/', views.tv_data),
    path('homepage/', views.user_homepage),
    path('api/logout_user/', views.logout_user),
    path('api/whoami/', views.whoami),
    path('homepage/account/', views.user_accountpage),
    path('homepage/movies/', views.all_movies),
    path('homepage/tvshows/', views.all_tvshows),
    path('api/getFavorites/', views.favorite_movies),
    path('api/addFavorite/', views.favorite_movies),
    path('api/deleteFavorite/', views.favorite_movies),
    path('homepage/favorites/', views.favorite_movies_view),
    path('api/inFavorites/', views.favorites_list),
    path('api/getFilmDetails/', views.get_film_details),
    path('api/search/', views.search_film),
    path('homepage/search/', views.search_film),
    path('api/genres/', views.generate_film),
    path('api/generate/', views.generate_film),
    path('api/searchDetails/', views.search_details),
    #re_path(r'.*', views.user_homepage)
]
