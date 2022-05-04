from django.urls import path

from .views import *

urlpatterns = [
    path("usuarios/", UsuariosAPIView.as_view(), name='usuarios'),
    path('usuarios/<int:pk>/', UsuariosAPIView.as_view(), name='usuariosParameters'),
    path("movies/", MoviesAPIView.as_view(), name='movies'),
    path('movies/<int:pk>/', MoviesAPIView.as_view(), name='moviesParameters'),
    path("fav/", FavoriteSerializer.as_view(), name='fav'),
    path('fav/<int:pk>/', FavoriteSerializer.as_view(), name='favParameters'),
]