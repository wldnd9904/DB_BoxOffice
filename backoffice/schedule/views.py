from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404

from .serializers import MovieSerializer
from .models import Movie

class MovieList(APIView):
    def get(self, request):
        movies=Movie.objects.all()
        serializer = MovieSerializer(movies,many=True)
        return Response(serializer.data)
    
    def post(self,request):
        serializer=MovieSerializer(
            data=request.data)
        if serializer.is_valid(): #데이터 유효성 검사
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        #유효하지않으면 400에러 발생

class MovieDetail(APIView):
    def get_object(self,pk): # Movie 객체 가져오기
        try:
            return Movie.objects.get(pk=pk)
        except Movie.DoesNotExist:
            raise Http404
        
    def get(self, request,pk,format=None): # Movie detail 보기
        movie=self.get_object(pk)
        serializer=MovieSerializer(movie)
        return Response(serializer.data)
    
    def put(self, request, pk, format=None): # Movie 수정하기
        movie=self.get_object(pk)
        serializer=MovieSerializer(movie,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None): # Movie 삭제
        movie=self.get_object(pk)
        movie.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)