from django.contrib import admin
from .models import *

class detUsuarios(admin.ModelAdmin):
    list_display = ('id','nome', 'email', 'fone', 'ativo')
    list_display_links = ('id',)
    search_fields = ('nome',)
    list_per_page = 10

class detMovie(admin.ModelAdmin):
    list_display = ('id', 'name', 'poster', 'category')
    list_display_links = ('id',)
    search_fields = ('name',)
    list_per_page = 10

class detFavorite(admin.ModelAdmin):
    list_display = ('id', 'name', 'poster', 'category')
    list_display_links = ('id',)
    search_fields = ('name',)
    list_per_page = 10

admin.site.register(Usuarios, detUsuarios)
admin.site.register(Movies, detMovie)
admin.site.register(Favorite, detFavorite)