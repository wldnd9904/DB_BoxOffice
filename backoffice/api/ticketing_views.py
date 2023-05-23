from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from django.http.response import JsonResponse
from django.db import connection, transaction
import datetime

from .serializers import (
    MovieSerializer,
    MovieCreateSerializer, 
    GenreSerializer, 
    MovGradeSerializer,
    ScheduleSerializer,
    TicketSerializer,
    TheaterSerializer,
    SeatSerializer,
    SeatGradeSerializer,
    )

from .models import (
    Movie, Genre, MovGrade, Schedule, 
    Ticket, Theater, Seat, SeatGrade, 
    Payment, PaymentMethod, CusGrade, Customer,
    )

class MovieList(APIView):
    def get(self, request):
        now=datetime.datetime.now().strftime("%Y-%m-%d")
        #movies=Movie.objects.all()
        movies=Movie.objects.raw(
            "SELECT distinct * FROM MOVIE where "\
            f"to_date('{now}','YYYY-MM-DD')>= release_date "\
            "order by release_date desc;"
        )
        serializer = MovieSerializer(movies,many=True)
        return Response(serializer.data)
    
    def post(self,request):
        serializer=MovieCreateSerializer(
            data=request.data)
        if serializer.is_valid(): #데이터 유효성 검사
            #mov_no=request.data.get('mov_no')
            mov_nm=request.data.get('mov_nm')
            run_time_min=request.data.get('run_time_min')
            mov_grade_no=request.data.get('mov_grade_no')
            dir_nm=request.data.get('dir_nm')
            act_nm=request.data.get('act_nm')
            mov_detail=request.data.get('mov_detail')
            distributer=request.data.get('distributer')
            lang=request.data.get('lang')
            image_url=request.data.get('image_url')
            gen_no=request.data.get('gen_no')
            release_date=request.data.get('release_date')

            with connection.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO MOVIE "\
                        f"VALUES (MOVIE_SEQ.NEXTVAL,'{mov_nm}', "\
                        f"'{run_time_min}', '{mov_grade_no}', '{dir_nm}', '{act_nm}', "\
                        f"'{mov_detail}', '{distributer}', '{lang}', '{image_url}', "\
                        f"'{gen_no}', '{release_date}');"
                )
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        #유효하지않으면 400에러 발생

class MovieDetail(APIView):
    def get_object(self,pk): # Movie 객체 가져오기
        try:
            return Movie.objects.raw(
                f"SELECT * FROM MOVIE WHERE mov_no={pk};"
                )
        except Movie.DoesNotExist:
            raise Http404
        
    def get(self, request,pk,format=None): # Movie detail 보기
        movie=self.get_object(pk)
        serializer=MovieSerializer(movie,many=True)
        return Response(serializer.data)
    
    def put(self, request, pk, format=None): # Movie 수정하기
        movie=self.get_object(pk)
        serializer=MovieSerializer(movie,data=request.data)
        if serializer.is_valid():
            mov_no=request.data.get('mov_no')
            mov_nm=request.data.get('mov_nm')
            run_time_min=request.data.get('run_time_min')
            mov_grade_no=request.data.get('mov_grade_no')
            dir_nm=request.data.get('dir_nm')
            act_nm=request.data.get('act_nm')
            mov_detail=request.data.get('mov_detail')
            distributer=request.data.get('distributer')
            lang=request.data.get('lang')
            image_url=request.data.get('image_url')
            gen_no=request.data.get('gen_no')
            release_date=request.data.get('release_date')

            with connection.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO MOVIE "\
                        f"VALUES ('{mov_no}','{mov_nm}', "\
                        f"'{run_time_min}', '{mov_grade_no}', '{dir_nm}', '{act_nm}', "\
                        f"'{mov_detail}', '{distributer}', '{lang}', '{image_url}', "\
                        f"'{gen_no}', '{release_date}');"
                )
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None): # Movie 삭제
        with connection.cursor() as cursor:
                cursor.execute(
                   f"DELETE FROM MOVIE WHERE mov_no={pk};"
                )
        return Response(status=status.HTTP_204_NO_CONTENT)
    
# class GenreList(APIView):
#     def get(self, request):
#         genres=Genre.objects.all()
#         serializer = GenreSerializer(genres,many=True)
#         return Response(serializer.data)
    
#     def post(self,request):
#         serializer=GenreSerializer(
#             data=request.data)
#         if serializer.is_valid(): #데이터 유효성 검사
#             serializer.save()
#             return Response(serializer.data,status=status.HTTP_201_CREATED)
#         return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
#         #유효하지않으면 400에러 발생

# class GenreDetail(APIView):
#     def get_object(self,pk): # genre 객체 가져오기
#         try:
#             return Genre.objects.get(pk=pk)
#         except Genre.DoesNotExist:
#             raise Http404
        
#     def get(self, request,pk,format=None): # genre detail 보기
#         genre=self.get_object(pk)
#         serializer=GenreSerializer(genre)
#         return Response(serializer.data)
    
#     def put(self, request, pk, format=None): # genre 수정하기
#         genre=self.get_object(pk)
#         serializer=GenreSerializer(genre,data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
#     def delete(self, request, pk, format=None): # genre 삭제
#         genre=self.get_object(pk)
#         genre.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# class CertificateList(APIView):
#     def get(self, request):
#         ceritificates=Certificate.objects.all()
#         serializer = CertificateSerializer(ceritificates,many=True)
#         return Response(serializer.data)
    
#     def post(self,request):
#         serializer=CertificateSerializer(
#             data=request.data)
#         if serializer.is_valid(): #데이터 유효성 검사
#             serializer.save()
#             return Response(serializer.data,status=status.HTTP_201_CREATED)
#         return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
#         #유효하지않으면 400에러 발생

# class CertificateDetail(APIView):
    # def get_object(self,pk): # certificate 객체 가져오기
    #     try:
    #         return Certificate.objects.get(pk=pk)
    #     except Certificate.DoesNotExist:
    #         raise Http404
        
    # def get(self, request,pk,format=None): # certificate detail 보기
    #     certificate=self.get_object(pk)
    #     serializer=CertificateSerializer(certificate)
    #     return Response(serializer.data)
    
    # def put(self, request, pk, format=None): # certificate 수정하기
    #     certificate=self.get_object(pk)
    #     serializer=CertificateSerializer(certificate,data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    # def delete(self, request, pk, format=None): # certificate 삭제
    #     certificate=self.get_object(pk)
    #     certificate.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)