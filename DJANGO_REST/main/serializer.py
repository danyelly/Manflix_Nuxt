from rest_framework import serializers
from .models import *

class UsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        many = True
        model = Usuarios
        fields = '__all__'

class MoviesSerializer(serializers.ModelSerializer):
    class Meta:
        many = True
        model = Movies
        fields = '__all__'

class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        many = True
        model = Favorite
        fields = '__all__'

