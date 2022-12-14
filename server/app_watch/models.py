from django.db import models
from django.contrib.auth.models import (AbstractUser)
# Create your models here.


class AppUser(AbstractUser):
    #User account
    email = models.EmailField(max_length=255, unique=True, verbose_name= 'email addresss')
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []



# class Watched(models.Model):
#     user_id = models.ForeignKey(AppUser, on_delete=models.CASCADE)
#     film_id = models.ForeignKey(Film, on_delete=models.CASCADE, related_name='user_watched', null=True)
    
# class Watchlist(models.Model):
#     user_id = models.ForeignKey(AppUser, on_delete=models.CASCADE)
#     film_id = models.CharField(on_delete=models.CASCADE, max_length=10, unique=True)

class FavoriteFilms(models.Model):
    user_id = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    film_id = models.CharField(max_length=10, unique=True, null=True)

    

# class FavoritePersons(models.Model):
#     user_id = models.ForeignKey(AppUser, on_delete=models.CASCADE)
#     person_id = models.ForeignKey(Person, on_delete=models.CASCADE, related_name="user_favorite_person", null=True)

# class PopularMovies(models.Model):
#     movie_id = models.IntegerField()
#     title =  models.CharField(max_length=255)
#     year = models.IntegerField()
#     imdb_id = models.CharField(max_length=25, null=True)
#     tmdb_id = models.IntegerField(null=True)
#     tmdb_type = models.CharField(max_length=25, null=True)
#     type = models.CharField(max_length=25, null=True)


