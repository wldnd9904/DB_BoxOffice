from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from django.http.response import JsonResponse, HttpResponse
from django.db import connection, transaction
import datetime

from .serializers import (
    MovieSerializer,
    MovieNoPKSerializer,
    GenreSerializer,
    MovGradeSerializer,
    ScheduleSerializer,
    ScheduleNoPKSerializer,
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
        serializer=MovieSerializer(
           data=request.data)
        if serializer.is_valid(): #데이터 유효성 검사
            #mov_no=request.data.get('mov_no')
            mov_nm=request.data.get('mov_nm')
            run_time_min=request.data.get('run_time_min')
            mov_grade_no=request.data.get('mov_grade_no')
            dir_nm=request.data.get('dir_nm')
            act_nm=request.data.get('act_nm')
            mov_detail=request.data.get('mov_detail')
            distributor=request.data.get('distributor')
            lang=request.data.get('lang')
            image_url=request.data.get('image_url')
            gen_no=request.data.get('gen_no')
            release_date=request.data.get('release_date')

            with connection.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO MOVIE "\
                        f"VALUES (MOVIE_SEQ.NEXTVAL,'{mov_nm}', "\
                        f"'{run_time_min}', '{mov_grade_no}', '{dir_nm}', '{act_nm}', "\
                        f"'{mov_detail}', '{distributor}', '{lang}', '{image_url}', "\
                        f"'{gen_no}', '{release_date}');"
                )
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        #유효하지않으면 400에러 발생

#특정 영화 조회, 수정, 삭제 
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
        serializer=MovieNoPKSerializer(data=request.data)
        if serializer.is_valid():
            mov_no=request.data.get('mov_no')
            mov_nm=request.data.get('mov_nm')
            run_time_min=request.data.get('run_time_min')
            mov_grade_no=request.data.get('mov_grade_no')
            dir_nm=request.data.get('dir_nm')
            act_nm=request.data.get('act_nm')
            mov_detail=request.data.get('mov_detail')
            distributor=request.data.get('distributor')
            lang=request.data.get('lang')
            image_url=request.data.get('image_url')
            gen_no=request.data.get('gen_no')
            release_date=request.data.get('release_date')

            with connection.cursor() as cursor:
                cursor.execute(
                    "UPDATE MOVIE "\
                        f"SET mov_no={mov_no},mov_nm='{mov_nm}', "\
                        f"run_time_min={run_time_min}, mov_grade_no={mov_grade_no}, "\
                        f"dir_nm='{dir_nm}', act_nm='{act_nm}',mov_detail='{mov_detail}', "\
                        f"distributor='{distributor}', lang='{lang}', image_url='{image_url}', "\
                        f"gen_no={gen_no}, release_date='{release_date}' where mov_no={mov_no};"
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

#오늘 상영일정 조회, 등록(관리자용)
class ScheduleList(APIView):
    def get(self, request):
        now=datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        schedules=Schedule.objects.raw(
            f"SELECT sched_no, mov_no, thea_no, to_date(run_date,'YYYY-MM-DD HH24:MI:SS')"\
            ",run_round, run_type, to_date(run_end_date,'YYYY-MM-DD HH24:MI:SS') FROM schedule where "\
            f"run_date=to_date('{now}','YYYY-MM-DD HH24:MI:SS');" #임시로 과거에 상영했던 일정 불러오기
        )
        serializer = ScheduleSerializer(schedules,many=True)
        return Response(serializer.data)
    
    @transaction.atomic
    def post(self,request):
        serializer=ScheduleSerializer(
            data=request.data)
        if serializer.is_valid(): #데이터 유효성 검사
            mov_no=request.data.get('mov_no')
            thea_no=request.data.get('thea_no')
            run_date=request.data.get('run_date')
            run_round=request.data.get('run_round')
            run_type=request.data.get('run_type')
            schedules=Schedule.objects.raw(
                f"SELECT * FROM schedule where thea_no={thea_no} and to_date('{run_date}','YYYY-MM-DD HH24:MI:SS') "\
                f"<= run_end_date and to_date('{run_date}','YYYY-MM-DD HH24:MI:SS')+"\
                f"(select run_time_min from movie where mov_no={mov_no})/(24*60) >= run_date;"
            )
            if not (schedules):
                with connection.cursor() as cursor:
                    cursor.execute(
                        f"INSERT INTO SCHEDULE VALUES(SCHEDULE_SEQ.NEXTVAL,{mov_no},"\
                        f"{thea_no},to_date('{run_date}','YYYY-MM-DD HH24:MI:SS'),"\
                        f"{run_round},'{run_type}',(select to_date('{run_date}','YYYY-MM-DD HH24:MI:SS') + "\
                        f"(SELECT RUN_TIME_MIN FROM MOVIE WHERE MOV_NO={mov_no})/(24*60) from dual"\
                        "));"
                    )
                return Response(serializer.data,status=status.HTTP_201_CREATED)
            return HttpResponse(status=400, content='중복된 상영스케줄이 존재합니다.')
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
         #유효하지않으면 400에러 발생

#특정 상영일정 조회, 수정, 삭제(관리자용)
class ScheduleDetail(APIView):
    def get_object(self,pk): # Schedule 객체 가져오기
        try:
            return Schedule.objects.raw(
                f"SELECT * FROM SCHEDULE WHERE sched_no={pk};"
                )
        except Schedule.DoesNotExist:
            return HttpResponse(status=400, content='검색한 상영스케줄이 존재하지 않습니다.')
        
    def get(self, request,pk,format=None): # Schedule detail 보기
        schedule=self.get_object(pk)
        serializer=ScheduleSerializer(schedule,many=True)
        return Response(serializer.data)
    
    @transaction.atomic
    def put(self, request, pk, format=None): # Schedule 수정하기
        serializer=ScheduleNoPKSerializer(
            data=request.data)
        if serializer.is_valid():
            sched_no=pk
            mov_no=request.data.get('mov_no')
            thea_no=request.data.get('thea_no')
            run_date=request.data.get('run_date')
            run_round=request.data.get('run_round')
            run_type=request.data.get('run_type')
            schedules=Schedule.objects.raw(
                f"SELECT * FROM schedule where thea_no={thea_no} and to_date('{run_date}','YYYY-MM-DD HH24:MI:SS') "\
                f"<= run_end_date and to_date('{run_date}','YYYY-MM-DD HH24:MI:SS')+(select run_time_min from movie "\
                f"where mov_no={mov_no})/(24*60) >= run_date "\
                f"and not sched_no={pk};"
            )
            if not (schedules):
                with connection.cursor() as cursor:
                    cursor.execute(
                        "UPDATE SCHEDULE "\
                            f"SET mov_no={mov_no},thea_no={thea_no},run_date=to_date('{run_date}','YYYY-MM-DD HH24:MI:SS'), "\
                            f"run_round={run_round},run_type='{run_type}',"\
                            f"run_end_date=(to_date('{run_date}','YYYY-MM-DD HH24:MI:SS')+"\
                            f"(select run_time_min from movie where mov_no={mov_no})/(24*60)) where sched_no={sched_no};"
                    )
                return Response(serializer.data)
            return HttpResponse(status=400, content='중복된 상영스케줄이 존재합니다.')
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None): # Schedule 삭제
        with connection.cursor() as cursor:
                cursor.execute(
                   f"DELETE FROM SCHEDULE WHERE sched_no={pk};"
                )
        return Response(status=status.HTTP_204_NO_CONTENT)

#상영일정 조회(소비자용): 영화, 상영관, 상영일시 선택 후 조회 =>남은 좌석 수도 보여줘야함
class User_ScheduleList(APIView):
    def get_object(self,mov_no,thea_no,run_date): # Schedule 객체 가져오기
        try:
            return Schedule.objects.raw(
                f"SELECT * FROM SCHEDULE WHERE mov_no={mov_no} and thea_no={thea_no} "\
                f"and to_char(run_date,'YYYY-MM-DD')='{run_date}';"
                )
        except Schedule.DoesNotExist:
            return HttpResponse(status=400, content='상영스케줄이 존재하지 않습니다.')
        
    def get(self, request,mov_no,thea_no,run_date,format=None): # Schedule detail 보기
        schedule=self.get_object(mov_no,thea_no,run_date)
        serializer=ScheduleSerializer(schedule,many=True)
        return Response(serializer.data)

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