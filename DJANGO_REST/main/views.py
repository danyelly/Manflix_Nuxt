from django.shortcuts import render
from .models import *
from .serializer import *
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponseRedirect
from rest_framework.permissions import IsAuthenticated


class UsuariosAPIView(APIView):

# permission_classes = (IsAuthenticated,)
    
    def get(self, request, pk=''):
        if 'nome' in request.GET:
            statusNome = request.GET['nome']
            usuarios = Usuarios.objects.filter(nome__contains=statusNome)
            serializer = UsuariosSerializer(usuarios, many=True)
            return Response(serializer.data)
        elif 'user' in request.GET:
            statusUser = request.GET['user']
            usuarios = Usuarios.objects.filter(idUser=statusUser)
            serializer = UsuariosSerializer(usuarios, many=True)
            return Response(serializer.data)
        elif 'ativo' in request.GET:
            statusAtivo = request.GET['ativo']
            usuarios = Usuarios.objects.filter(ativo=statusAtivo)
            serializer =UsuariosSerializer(usuarios, many=True)
            return Response(serializer.data)
        elif pk == '':
            usuarios = Usuarios.objects.all()
            serializer = UsuariosSerializer(usuarios, many=True)
            return Response(serializer.data)
        else:
            usuarios = Usuarios.objects.get(id=pk)
            serializer = UsuariosSerializer(usuarios)
            return Response(serializer.data)

    def post(self, request):
        serializer = UsuariosSerializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()        
        return Response({"msg": "Inserido com sucesso"})
        #return Response({"id": serializer.data['id']})

    def put(self, request, pk=''):
        usuarios = Usuarios.objects.get(id=pk)
        serializer = UsuariosSerializer(usuarios, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk=''):        
        usuarios = Usuarios.objects.get(id=pk)       
        usuarios.delete()
        return Response({"msg": "Apagado com sucesso"})

class MoviesAPIView(APIView):
    # permission_classes = (IsAuthenticated,)
    def get(self, request, pk=''):
        if pk == '':
            movie = Movies.objects.all()
            serializer = MoviesSerializer(movie, many=True)
            return Response(serializer.data)
        else:
            movie = Movies.objects.get(id=pk)
            serializer = MoviesSerializer(movie)
            return Response(serializer.data)

    def post(self, request):
        serializer = MoviesSerializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({"msg": "Inserido com sucesso"})

    def put(self, request, pk=''):
        movie = Movies.objects.get(id=pk)
        serializer = MoviesSerializer(movie, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk=''):
        movie = Movies.objects.get(id=pk)
        movie.delete()
        return Response({"msg": "Apagado com sucesso"})

class FavoriteSerializer(APIView):
    # permission_classes = (IsAuthenticated,)
    def get(self, request, pk=''):
        if pk == '':
            favoriteM = Favorite.objects.all()
            serializer = FavoriteSerializer(favoriteM, many=True)
            return Response(serializer.data)
        else:
            favoriteM = Favorite.objects.get(id=pk)
            print('----------------------FAVORITE------------------',favoriteM)
            serializer = FavoriteSerializer(favoriteM)
            return Response(serializer.data)

    def post(self, request):
        serializer = FavoriteSerializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({"msg": "Inserido com sucesso"})

    def put(self, request, pk=''):
        favoriteM = Favorite.objects.get(id=pk)
        serializer = FavoriteSerializer(favoriteM, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk=''):
        favoriteM = Favorite.objects.get(id=pk)
        favoriteM.delete()
        return Response({"msg": "Apagado com sucesso"})