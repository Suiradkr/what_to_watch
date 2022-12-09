from django.db import models
from django.contrib.auth.models import (AbstractUser)
# Create your models here.


class AppUser(AbstractUser):
    #User account
    email = models.EmailField(max_length=255)

class Film(models.Model):
    watchmode_id = models.IntegerField()
    imdb_id = models.CharField(max_length=25, null=True)
    tmdb_id = models.IntegerField(default=0, null=True)
    tmdb_type = models.CharField(max_length=10, null=True)
    title = models.CharField(max_length=255, null=True)
    year = models.IntegerField(null=True)

class Person(models.Model):
    watchmode_id = models.IntegerField(null=True)
    imdb_id = models.CharField(max_length=25, null=True)
    tmdb_id = models.IntegerField(null=True)

class Watched(models.Model):
    user_id = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    film_id = models.ForeignKey(Film, on_delete=models.CASCADE, related_name='user_watched', null=True)
    
class Watchlist(models.Model):
    user_id = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    film_id = models.ForeignKey(Film, on_delete=models.CASCADE, related_name="user_watchlist", null=True)

class FavoriteFilms(models.Model):
    user_id = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    film_id = models.ForeignKey(Film, on_delete=models.CASCADE, related_name="user_favorite_film", null=True)
    

class FavoritePersons(models.Model):
    user_id = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    person_id = models.ForeignKey(Person, on_delete=models.CASCADE, related_name="user_favorite_person", null=True)


