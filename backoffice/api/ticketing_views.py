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
    )

#영화 조회(현재 개봉 + 최신 영화) & 등록
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

#특정 영화 조회, 수정 삭제 
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

#장르 조회, 등록    
class GenreList(APIView):
    def get(self, request):
        genres=Genre.objects.raw(
            "SELECT * FROM GENRE"
        )
        serializer = GenreSerializer(genres,many=True)
        return Response(serializer.data)
    
    def post(self,request):
        serializer=GenreSerializer(
            data=request.data)
        if serializer.is_valid(): #데이터 유효성 검사
            gen_no=request.data.get('gen_no')
            gen_nm=request.data.get('gen_nm')
            with connection.cursor() as cursor:
                cursor.execute(
                    f"INSERT INTO GENRE VALUES({gen_no},{gen_nm});"
                )
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        #유효하지않으면 400에러 발생

#등급 조회, 등록
class MovGradeList(APIView):
    def get(self, request):
        genres=MovGrade.objects.raw(
            "SELECT * FROM Mov_Grade;"
        )
        serializer = MovGradeSerializer(genres,many=True)
        return Response(serializer.data)
    
    def post(self,request):
        serializer=MovGradeSerializer(
            data=request.data)
        if serializer.is_valid(): #데이터 유효성 검사
            mov_grade_no=request.data.get('mov_grade_no')
            mov_grade_nm=request.data.get('mov_grade_nm')
            with connection.cursor() as cursor:
                cursor.execute(
                    f"INSERT INTO MOV_GRADE VALUES({mov_grade_no},{mov_grade_nm});"
                )
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        #유효하지않으면 400에러 발생

#상영일정 조회, 등록(미완)
class ScheduleList(APIView):
    def get(self, request):
        now=datetime.datetime.now().strftime("%Y-%m-%d")
        schedules=Schedule.objects.raw(
            "SELECT distinct * FROM schedule where "\
            f"run_date=to_date('{now}','YYYY-MM-DD');"
        )
        serializer = ScheduleSerializer(schedules,many=True)
        return Response(serializer.data)
    
    def post(self,request):
        serializer=MovGradeSerializer(
            data=request.data)
        if serializer.is_valid(): #데이터 유효성 검사
            mov_grade_no=request.data.get('mov_grade_no')
            mov_grade_nm=request.data.get('mov_grade_nm')
            with connection.cursor() as cursor:
                cursor.execute(
                    f"INSERT INTO MOV_GRADE VALUES({mov_grade_no},{mov_grade_nm});"
                )
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        #유효하지않으면 400에러 발생

#상영관 조회, 등록
class TheaterList(APIView):
    def get(self, request):
        genres=Theater.objects.raw(
            "SELECT * FROM theater;"
        )
        serializer = TheaterSerializer(genres,many=True)
        return Response(serializer.data)
    
    def post(self,request):
        serializer=TheaterSerializer(
            data=request.data)
        if serializer.is_valid(): #데이터 유효성 검사
            thea_no=request.data.get('thea_no')
            thea_nm=request.data.get('thea_nm')
            thea_loc=request.data.get('thea_loc')
            with connection.cursor() as cursor:
                cursor.execute(
                    f"INSERT INTO THEATER VALUES({thea_no},{thea_nm},{thea_loc});"
                )
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        #유효하지않으면 400에러 발생

#좌석 조회, 등록
class SeatList(APIView):
    def get(self, request):
        genres=Seat.objects.raw(
            "SELECT * FROM SEAT;"
        )
        serializer = SeatSerializer(genres,many=True)
        return Response(serializer.data)
    
    def post(self,request):
        serializer=SeatSerializer(
            data=request.data)
        if serializer.is_valid(): #데이터 유효성 검사
            seat_no=request.data.get('seat_no')
            thea_no=request.data.get('thea_no')
            seat_grade_no=request.data.get('seat_grade_no')
            with connection.cursor() as cursor:
                cursor.execute(
                    f"INSERT INTO SEAT VALUES({seat_no},{thea_no},{seat_grade_no});"
                )
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        #유효하지않으면 400에러 발생

#좌석 등급 조회, 등록
class SeatGradeList(APIView):
    def get(self, request):
        genres=SeatGrade.objects.raw(
            "SELECT * FROM SEAT_GRADE;"
        )
        serializer = SeatGradeSerializer(genres,many=True)
        return Response(serializer.data)
    
    def post(self,request):
        serializer=SeatGradeSerializer(
            data=request.data)
        if serializer.is_valid(): #데이터 유효성 검사
            seat_grade_no=request.data.get('seat_grade_no')
            seat_grade_nm=request.data.get('seat_grade_nm')
            with connection.cursor() as cursor:
                cursor.execute(
                    f"INSERT INTO SEAT_GRADE VALUES({seat_grade_no},{seat_grade_nm});"
                )
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        #유효하지않으면 400에러 발생