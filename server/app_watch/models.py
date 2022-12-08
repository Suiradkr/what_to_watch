from django.db import models
from django.contrib.auth.models import (AbstractUser)
# Create your models here.


class AppUser(AbstractUser):
    #User account
    email = models.EmailField(max_length=255)

class Movie(models.Model):
    title = models.CharField(max_length=100)
    year = models.IntegerField()

class Watched(models.Model):
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    
class Watchlist(models.Model):
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)

class Favorite(models.Model):
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
