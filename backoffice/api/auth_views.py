import datetime
import hashlib
import jwt

from django.conf import settings
from django.db import connection

from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from drf_yasg.utils import no_body, swagger_auto_schema

from .serializers import (
    SignUpSerializer,
    LogInSerializer,
    NSignUpSerializer,
    NLogInSerializer
    )

from .models import (
    Customer
    )

class AuthViewSet(viewsets.ViewSet):
    # For Staff
    # Log In
    @swagger_auto_schema(request_body=LogInSerializer, responses={200: None})
    @action(detail=False, methods=['post'])
    def slogin(self, request):
        serializer = LogInSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = request.data.get('email')
        cus_pw = hashlib.sha256(request.data.get('cus_pw').encode()).hexdigest()

        response = Response(status=401, data='잘못된 아이디 또는 비밀번호 입니다.')
        try:
            user = Customer.objects.raw(
                f'SELECT * FROM (SELECT * FROM CUSTOMER WHERE EMAIL=\'{email}\' AND CUS_GRADE_NO=\'{0}\') WHERE ROWNUM=1;'
            )[0]
        except IndexError:
            return response
        else:
            if user.cus_pw != cus_pw:
                return response
            
            res = {
                'id' : email,
                'cus_nm' : user.cus_nm,
                'cus_grade_no' : user.cus_grade_no,
            }
            token = jwt.encode(res, settings.SECRET_KEY, settings.ALGORITHM)
            response = Response(status=200)
            response.set_cookie('jwt', token, httponly=False)
            return response

    # For Member
    # Sign Up
    @swagger_auto_schema(request_body=SignUpSerializer, responses={201: None})
    @action(detail=False, methods=['post'])
    def signup(sefl, request):
        serializer = SignUpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        resident_no = request.data.get('resident_no')
        phone_no = request.data.get('phone_no')
        cus_nm = request.data.get('cus_pw')
        now = datetime.datetime.now().strftime("%Y-%m-%d")
        email = request.data.get('email')
        address = request.data.get('address')
        cus_pw = hashlib.sha256(request.data.get('cus_pw').encode()).hexdigest()

        try:
            Customer.objects.raw(
                f'SELECT * FROM (SELECT * FROM CUSTOMER WHERE EMAIL=\'{email}\') WHERE ROWNUM=1;'
            )[0]
            
        except IndexError:
            with connection.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO CUSTOMER (RESIDENT_NO, PHONE_NO, CUS_NM, REGI_DATE, EMAIL, ADDRESS, CUS_PW, CUS_GRADE_NO, CUS_POINT)" \
                        f"VALUES ('{resident_no}', '{phone_no}', '{cus_nm}', '{now}', '{email}', '{address}', '{cus_pw}', '{2}', '{0}');"
                )
                res = {
                    'id' : email,
                    'cus_nm' : cus_nm,
                    'cus_grade_no' : 2,
                }
                token = jwt.encode(res, settings.SECRET_KEY, settings.ALGORITHM)
                response = Response(status=status.HTTP_201_CREATED)
                response.set_cookie('jwt', token, httponly=False)
                return response
            
        return Response(status=409, data='이미 존재하는 아이디 입니다.')
    
    # Log In
    @swagger_auto_schema(request_body=LogInSerializer, responses={200: None})
    @action(detail=False, methods=['post'])
    def login(self, request):
        serializer = LogInSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = request.data.get('email')
        cus_pw = hashlib.sha256(request.data.get('cus_pw').encode()).hexdigest()

        response = Response(status=401, data='잘못된 아이디 또는 비밀번호 입니다.')
        try:
            user = Customer.objects.raw(
                f'SELECT * FROM (SELECT * FROM CUSTOMER WHERE EMAIL=\'{email}\' AND CUS_GRADE_NO=\'{2}\') WHERE ROWNUM=1;'
            )[0]
        except IndexError:
            return response
        else:
            if user.cus_pw != cus_pw:
                return response
            
            res = {
                'id' : email,
                'cus_nm' : user.cus_nm,
                'cus_grade_no' : user.cus_grade_no,
            }
            token = jwt.encode(res, settings.SECRET_KEY, settings.ALGORITHM)
            response = Response(status=200, data=user.cus_point)
            response.set_cookie('jwt', token, httponly=False)
            return response
        
    # For Non-member
    # Sign Up
    @swagger_auto_schema(request_body=NSignUpSerializer, responses={200: None})
    @action(detail=False, methods=['post'])
    def nsignup(self, request):
        serializer = NSignUpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        resident_no = request.data.get('resident_no')
        phone_no = request.data.get('phone_no')
        cus_nm = request.data.get('cus_pw')
        now = datetime.datetime.now().strftime("%Y-%m-%d")
        cus_pw = hashlib.sha256(request.data.get('cus_pw').encode()).hexdigest()

        try:
            Customer.objects.raw(
                f'SELECT * FROM (SELECT * FROM CUSTOMER WHERE EMAIL=\'{phone_no}\') WHERE ROWNUM=1;'
            )[0]
            
        except IndexError:
            with connection.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO CUSTOMER (RESIDENT_NO, PHONE_NO, CUS_NM, REGI_DATE, EMAIL, ADDRESS, CUS_PW, CUS_GRADE_NO, CUS_POINT)" \
                        f"VALUES ('{resident_no}', '{phone_no}', '{cus_nm}', '{now}', '{cus_pw}', '{1}', '{0}');"
                )
                res = {
                    'id' : phone_no,
                    'cus_nm' : cus_nm,
                    'cus_grade_no' : 1,
                }
                token = jwt.encode(res, settings.SECRET_KEY, settings.ALGORITHM)
                response = Response(status=status.HTTP_201_CREATED)
                response.set_cookie('jwt', token, httponly=False)
                return response
            
        return Response(status=409, data='이미 존재하는 계정 입니다.')
    
    # Log In
    @swagger_auto_schema(request_body=NLogInSerializer, responses={200: None})
    @action(detail=False, methods=['post'])
    def nlogin(self, request):
        serializer = NLogInSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        phone_no = request.data.get('phone_no')
        cus_pw = hashlib.sha256(request.data.get('cus_pw').encode()).hexdigest()

        response = Response(status=401, data='잘못된 휴대폰 번호 또는 비밀번호 입니다.')
        try:
            user = Customer.objects.raw(
                f'SELECT * FROM (SELECT * FROM CUSTOMER WHERE EMAIL=\'{phone_no}\') WHERE ROWNUM=1;'
            )[0]
        except IndexError:
            return response
        else:
            if user.cus_pw != cus_pw:
                return response
            
            res = {
                'id' : phone_no,
                'cus_nm' : user.cus_nm,
                'cus_grade_no' : user.cus_grade_no,
            }
            token = jwt.encode(res, settings.SECRET_KEY, settings.ALGORITHM)
            response = Response(status=200)
            response.set_cookie('jwt', token, httponly=False)
            return response

        
    # Log Out
    @swagger_auto_schema(request_body=no_body, responses={200: None})
    @action(detail=False, methods=['post'])
    def logout(self, request):
        response = Response(status=200)
        response.delete_cookie('jwt')
        return response