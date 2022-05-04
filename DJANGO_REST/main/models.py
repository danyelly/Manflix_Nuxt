from django.db import models

from django.contrib.auth.models import User
from django.utils import timezone

# impede a criação de usuários com emails repetidos
User._meta.get_field('email')._unique = True
#impede com que o email seja null ou vazio durante cadastro
User._meta.get_field('email').blank = False
User._meta.get_field('email').null = False


def upload_image_user(instance, filename):
    return f"{filename}"

def upload_moviePoster(instance, filename):
    return f"movies/{filename}"

def upload_movieFav(instance, filename):
    return f"fav/{filename}"

# {instance.id}-{timezone.now()}-
class Usuarios(models.Model):
    nome = models.CharField(max_length=55)
    idUser = models.ForeignKey(User, related_name="usuario", on_delete=models.CASCADE)
    email = models.CharField(max_length=80)
    fone = models.CharField(max_length=15, null=True, blank=True)
    ativo = models.BooleanField(default=False)
    foto = models.ImageField(upload_to=upload_image_user, blank=True, null=True)

    def __str__(self):
        return self.nome    

class Movies(models.Model):
    name = models.CharField(max_length=50)
    poster = models.ImageField(upload_to=upload_moviePoster, blank=True, null=True)
    category= models.CharField(max_length=30)

    def __str__(self):
        return self.name

class Favorite(models.Model):
    name = models.CharField(max_length=50)
    poster = models.CharField(max_length=100)
    category= models.CharField(max_length=30)

    def __str__(self):
        return self.name
