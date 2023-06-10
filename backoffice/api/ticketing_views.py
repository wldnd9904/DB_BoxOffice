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
    DetailCodeSerializer,
    ScheduleSerializer,
    SchedulePostSerializer,
    ScheduleNoPKSerializer,
    TicketSerializer,
    TicketPutSerializer,
    TheaterSerializer,
    TheaterPutSerializer,
    SeatSerializer,
    SeatPostSerializer,
    )

from .models import (
    Movie, Schedule, Ticket, Theater, Seat, DetailCode,
    )

#영화 조회(현재 개봉 + 최신 영화) & 등록 <= 최신 날짜 상위 20개
class MovieList(APIView):
    def get(self, request):
        now=datetime.datetime.now().strftime("%Y-%m-%d")
        #movies=Movie.objects.all()
        movies=Movie.objects.raw(
            "select * from (SELECT distinct * FROM MOVIE "\
            "order by release_date desc) where ROWNUM <= 20;"
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

#영화 조회(소비자용) 최신 날짜 상위 20개
class User_MovieList(APIView):
    def get(self, request,flag):
        #now=datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        now='2023-05-27 12:00:00' #테스트 시간
        if (flag==0): #현재 개봉된 영화
            movies=Movie.objects.raw(
                "select * from (SELECT distinct * FROM MOVIE m where "\
                f"to_date('{now}','YYYY-MM-DD HH24:MI:SS')>= m.release_date and "\
                f"to_date('{now}','YYYY-MM-DD HH24:MI:SS')<(select max(run_date) from schedule s "\
                "group by mov_no having s.mov_no=m.mov_no) order by release_date desc) where ROWNUM <= 20;"
            )
        else: #개봉 예정 영화까지 포함
            movies=Movie.objects.raw(
                "select * from (SELECT distinct * FROM MOVIE m where "\
                f"to_date('{now}','YYYY-MM-DD HH24:MI:SS')<(select max(run_date) from schedule s "\
                "group by mov_no having s.mov_no=m.mov_no) order by release_date desc) where ROWNUM <= 20;"
            )
        serializer = MovieSerializer(movies,many=True)
        return Response(serializer.data)

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
        return Response(serializer.data[0])
    
    def put(self, request, pk, format=None): # Movie 수정하기
        serializer=MovieNoPKSerializer(data=request.data)
        if serializer.is_valid():
            mov_no=request.data.get('mov_no')
            mov_nm=request.data.get('mov_nm').replace("'","''")
            run_time_min=request.data.get('run_time_min')
            mov_grade_no=request.data.get('mov_grade_no')
            dir_nm=request.data.get('dir_nm')
            act_nm=request.data.get('act_nm')
            mov_detail=request.data.get('mov_detail').replace("'","''")
            distributor=request.data.get('distributor')
            lang=request.data.get('lang')
            image_url=request.data.get('image_url')
            gen_no=request.data.get('gen_no')
            release_date=request.data.get('release_date')

            with connection.cursor() as cursor:
                cursor.execute(
                    "UPDATE MOVIE "\
                        f"SET mov_no={mov_no},mov_nm='{mov_nm}', "\
                        f"run_time_min={run_time_min}, mov_grade_no='{mov_grade_no}', "\
                        f"dir_nm='{dir_nm}', act_nm='{act_nm}',mov_detail='{mov_detail}', "\
                        f"distributor='{distributor}', lang='{lang}', image_url='{image_url}', "\
                        f"gen_no='{gen_no}', release_date='{release_date}' where mov_no={mov_no};"
                )
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None): # Movie 삭제
        with connection.cursor() as cursor:
                cursor.execute(
                   f"DELETE FROM MOVIE WHERE mov_no={pk};"
                )
        return Response(status=status.HTTP_204_NO_CONTENT)

#코드 조회, 등록  
class CodeList(APIView):
    def get(self, request, no):
        if no==1:
            codes=DetailCode.objects.raw(
                "SELECT * FROM DETAIL_CODE WHERE CODE_NO='CD001';"
            )
        elif no==2:
            codes=DetailCode.objects.raw(
                "SELECT * FROM DETAIL_CODE WHERE CODE_NO='CD002';"
            )
        elif no==3:
            codes=DetailCode.objects.raw(
                "SELECT * FROM DETAIL_CODE WHERE CODE_NO='CD003';"
            )
        elif no==4:
            codes=DetailCode.objects.raw(
                "SELECT * FROM DETAIL_CODE WHERE CODE_NO='CD004';"
            )
        else:
            codes=DetailCode.objects.raw(
                "SELECT * FROM DETAIL_CODE WHERE CODE_NO='CD005';"
            )
        serializer = DetailCodeSerializer(codes,many=True)
        return Response(serializer.data)
    
    def post(self,request,no):
        serializer=DetailCodeSerializer(
            data=request.data)
        if serializer.is_valid(): #데이터 유효성 검사
            detail_code_no=request.data.get('detail_code_no')
            detail_code_nm=request.data.get('detail_code_nm')
            code_no=request.data.get('code_no')
            with connection.cursor() as cursor:
                cursor.execute(
                    f"INSERT INTO DETAIL_CODE VALUES({detail_code_no},'{detail_code_nm}','{code_no}');"
                )
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        #유효하지않으면 400에러 발생

#모든 코드 조회
class CodeAllList(APIView):
    def get(self, request):
        codes=DetailCode.objects.raw(
                "SELECT * FROM DETAIL_CODE;"
            )
        serializer = DetailCodeSerializer(codes,many=True)
        return Response(serializer.data)

#상영일정 조회, 등록(관리자용)
class ScheduleList(APIView):
    def get(self, request):
        #now=datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        schedules=Schedule.objects.raw(
            f"SELECT sched_no, mov_no, thea_no, to_date(run_date,'YYYY-MM-DD HH24:MI:SS')"\
            ",run_round, run_type, to_date(run_end_date,'YYYY-MM-DD HH24:MI:SS') FROM schedule order by sched_no asc;"
        )
        serializer = ScheduleSerializer(schedules,many=True)
        # for i in range(len(serializer.data)):
        #     print(serializer.data[i]['sched_no'])
        
        with connection.cursor() as cursor:
            cursor.execute(
                f"select count(t.issue) from schedule s "\
                f"left outer join (select tic_no,sched_no,issue from ticket,seat where seat_grade_no!='CD00500' "\
                "and ticket.seat_no=seat.seat_no and ticket.thea_no=seat.thea_no) t on s.sched_no = t.sched_no group by s.sched_no;"
            )
            row=cursor.fetchall()
        for i in range(len(row)):
            serializer.data[i]['max_people']=row[i][0]

        with connection.cursor() as cursor:
            cursor.execute(
                f"select count(t.issue) from schedule s "\
                f"left outer join (select tic_no,sched_no,issue from ticket,seat where issue=0 and seat_grade_no!='CD00500' "\
                "and ticket.seat_no=seat.seat_no and ticket.thea_no=seat.thea_no) t on s.sched_no = t.sched_no group by s.sched_no;"
            )
            row=cursor.fetchall()
        for i in range(len(row)):
            serializer.data[i]['cur_people']=row[i][0]
        
        with connection.cursor() as cursor:
            cursor.execute(
                f"select thea_nm from schedule s, theater t where s.thea_no=t.thea_no order by s.sched_no;"
            )
            row=cursor.fetchall()
        for i in range(len(row)):
            serializer.data[i]['thea_nm']=row[i][0]
        
        return Response(serializer.data)
    
    @transaction.atomic
    def post(self,request):
        now=datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        serializer=SchedulePostSerializer(
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
                    
                    #SCHED_NO 조회
                    cursor.execute(
                        "select schedule_seq.currval from dual;"
                    )
                    curr_sched_seq=cursor.fetchone()
                    
                    #Theater의 총 좌석 수 카운트
                    cursor.execute(
                        f"select seat_no from seat where thea_no={thea_no};"
                    )
                    total_seat=cursor.fetchall()

                    #Ticket 자동 생성
                    for i in range(len(total_seat)):
                        cursor.execute(
                            "SELECT ORA_HASH(CONCAT(TO_CHAR(RUN_DATE,'YYYYMMDD'),SCHED_NO+TIC_SEQ.NEXTVAL),"\
                            f"999999999,3) FROM SCHEDULE WHERE SCHED_NO={curr_sched_seq[0]};"
                        )
                        tic_no=cursor.fetchone()
                        
                        cursor.execute(
                            f"SELECT SEAT_GRADE_NO FROM SEAT WHERE SEAT_NO='{total_seat[i][0]}' AND "\
                            f"THEA_NO={thea_no};"
                        )
                        seat_grade_no=cursor.fetchone()
                        if seat_grade_no[0] != 'CD00500':
                            cursor.execute(
                                f"INSERT INTO TICKET VALUES({tic_no[0]},{curr_sched_seq[0]},'{total_seat[i][0]}',"\
                                f"{thea_no},null,null,{request.data.get(seat_grade_no[0])},'{now}',0);"
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
            run_date=request.data.get('run_date').replace('T',' ')
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

#상영관 조회, 등록
class TheaterList(APIView):
    def get(self, request):
        theaters=Theater.objects.raw(
            "SELECT * FROM theater;"
        )
        serializer = TheaterSerializer(theaters,many=True)

        # with connection.cursor() as cursor:
        #     cursor.execute(
        #         "select max(substr(seat_no,2)) from seat group by thea_no;"
        #     )
        #     max_seats=cursor.fetchall()
        # for i in range(len(max_seats)):
        #     serializer.data[i]['max_seat']=max_seats[i][0]
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
                    f"INSERT INTO THEATER VALUES({thea_no},'{thea_nm}','{thea_loc}');"
                )
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        #유효하지않으면 400에러 발생

#상영관 수정, 삭제(관리자용)
class TheaterDetail(APIView):

    def get(self, request, thea_no,format=None):
        theaters=Theater.objects.raw(
                f"SELECT * FROM THEATER WHERE thea_no={thea_no};"
                )
        serializer=TheaterSerializer(theaters,many=True)
        return Response(serializer.data)

    def put(self, request, thea_no,format=None):
        serializer=TheaterPutSerializer(data=request.data)
        if serializer.is_valid():
            thea_nm=request.data.get('thea_nm')
            thea_loc=request.data.get('thea_loc')
            with connection.cursor() as cursor:
                cursor.execute(
                    f"Update theater set thea_nm='{thea_nm}',thea_loc='{thea_loc}' "\
                    f"where thea_no={thea_no};"
                )
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, thea_no, format=None):
        with connection.cursor() as cursor:
            cursor.execute(
                f"Delete from theater where thea_no={thea_no};"
            )
        return Response(status=status.HTTP_204_NO_CONTENT)

#좌석 조회, 등록, 수정 (상영관 별)
class SeatList(APIView):

    def get(self, request, thea_no):
        seats=Seat.objects.raw(
            f"SELECT * FROM SEAT where thea_no={thea_no};"
        )
        serializer = SeatSerializer(seats,many=True)
        for i in range(0,len(serializer.data)):
            serializer.data[i]['row']=ord(serializer.data[i]['seat_no'][0]) - 64
            serializer.data[i]['col']=int(serializer.data[i]['seat_no'][2])
        return Response(serializer.data)
    
    def post(self,request, thea_no):
        print(request.data)
        #print(request.data.getlist('%d[]'% 0))
        seat_dic={}
        count=0
        for i in range(len(request.data)):
            seat_data=request.data.getlist('%d[]'% i)
            #print(seat_data)
            seat_dic['seat_no']=seat_data[0]
            seat_dic['thea_no']=int(seat_data[1])
            seat_dic['seat_grade_no']=seat_data[2]

            serializer=SeatPostSerializer(
                data=seat_dic)
            if serializer.is_valid(): #데이터 유효성 검사
                seat_no=seat_dic['seat_no']
                #print(seat_no)
                #thea_no=request.data.get('thea_no')
                seat_grade_no=seat_dic['seat_grade_no']
                with connection.cursor() as cursor:
                    cursor.execute(
                        f"INSERT INTO SEAT VALUES('{seat_no}',{thea_no},'{seat_grade_no}');"
                    )
                count+=1
        if count==len(request.data):
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        #유효하지않으면 400에러 발생

    def put(self, request, thea_no, format=None): # Seat 수정하기
        print(request.data)
        seat_dic={}
        count=0
        for i in range(len(request.data)):
            seat_data=request.data.getlist('%d[]'% i)
            #print(seat_data)
            seat_dic['seat_no']=seat_data[0]
            seat_dic['thea_no']=int(seat_data[1])
            seat_dic['seat_grade_no']=seat_data[2]

            serializer=SeatPostSerializer(data=seat_dic)
            if serializer.is_valid():
                seat_no=seat_dic['seat_no']
                #thea_no=request.data.get('thea_no')
                seat_grade_no=seat_dic['seat_grade_no']
                with connection.cursor() as cursor:
                    cursor.execute(
                        f"Update Seat set seat_grade_no='{seat_grade_no}' "\
                        f"where seat_no='{seat_no}' and thea_no={thea_no};"
                    )
                count+=1
        if count==len(request.data):
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

#좌석 조회, 수정, 삭제
class SeatDetail(APIView):
    seat_dic={'A':1,'B':2,'C':3,'D':4,'E':5,'F':6,'G':7,'H':8,'I':9}

    def get_object(self,seat_no,thea_no): # Seat 객체 가져오기
        try:
            return Seat.objects.raw(
                f"SELECT * FROM SEAT WHERE seat_no='{seat_no}' and thea_no={thea_no};"
                )
        except Seat.DoesNotExist:
            raise Http404
        
    def get(self, request,seat_no,thea_no,format=None): # Seat detail 보기
        seat=self.get_object(seat_no,thea_no)
        serializer=SeatSerializer(seat,many=True)
        serializer.data[0]['row']=self.seat_dic[serializer.data[0]['seat_no'][0]]
        serializer.data[0]['col']=int(serializer.data[0]['seat_no'][2])
        return Response(serializer.data)
    
    def put(self, request, seat_no, thea_no, format=None): # Seat 수정하기
        serializer=SeatPostSerializer(data=request.data)
        if serializer.is_valid():
            seat_no2=request.data.get('seat_no')
            thea_no2=request.data.get('thea_no')
            seat_grade_no2=request.data.get('seat_grade_no')
            with connection.cursor() as cursor:
                cursor.execute(
                    f"Update Seat set seat_no='{seat_no2}',thea_no={thea_no2},seat_grade_no={seat_grade_no2} "\
                    f"where seat_no='{seat_no}' and thea_no={thea_no};"
                )
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, seat_no, thea_no, format=None):
        with connection.cursor() as cursor:
            cursor.execute(
                f"Delete from Seat where seat_no='{seat_no}' and thea_no={thea_no};"
            )
        return Response(status=status.HTTP_204_NO_CONTENT)

#티켓 조회(상영일정별)
class TicketList(APIView):
    def get(self,request,sched_no):
        with connection.cursor() as cursor:
            cursor.execute(
                f"SELECT tic_no,seat_no,issue FROM ticket t where sched_no={sched_no};"
            )
            tickets=cursor.fetchall()
        #print(tickets) [('A01',0),('A02',1)]
        res=list(map(
            lambda j:{
                "tic_no":j[0],
                "seat_no":j[1],
                "issue":j[2]
            },tickets
        ))
        # tickets=Ticket.objects.raw(
        #     f"SELECT * FROM ticket t where sched_no={sched_no};"
        # )
        # serializer = TicketSerializer(tickets,many=True)
        return Response(res)

#특정 티켓 조회, 수정, 삭제
class TicketDetail(APIView):
    def get(self,request,tic_no):
        tickets=Ticket.objects.raw(
            f"SELECT * FROM ticket t where tic_no={tic_no};" 
        )
        serializer = TicketSerializer(tickets,many=True)
        return Response(serializer.data)
    
    def put(self, request, tic_no, format=None): # ticket 수정하기
        serializer=TicketPutSerializer(data=request.data)
        if serializer.is_valid():
            pay_no=request.data.get('pay_no')
            cus_no=request.data.get('cus_no')
            price=request.data.get('price')
            reserv_date=request.data.get('reserv_date')
            issue=request.data.get('issue')
            with connection.cursor() as cursor:
                cursor.execute(
                    f"Update ticket set pay_no={pay_no},cus_no={cus_no},price={price},"\
                    f"reserv_date='{reserv_date}', issue={issue} where tic_no={tic_no};"
                )
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request,tic_no,format=None):
        with connection.cursor() as cursor:
            cursor.execute(
                f"Delete from ticket where tic_no={tic_no};"
            )
        return Response(status=status.HTTP_204_NO_CONTENT)