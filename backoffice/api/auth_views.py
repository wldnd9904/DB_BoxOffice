import datetime
import hashlib
import jwt

from django.shortcuts import render
from django.http import Http404
from django.http.response import JsonResponse
from django.db import connection, transaction
from django.conf import settings

from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action

from drf_yasg.utils import no_body, swagger_auto_schema

from .serializers import (
    SignUpSerializer,
    LogInSerializer
    )

from .models import (
    Customer
    )

class AuthViewSet(viewsets.ViewSet):

    # Sign Up
    @swagger_auto_schema(request_body=SignUpSerializer, responses={201: None})
    @action(detail=False, methods=['post'])
    def signup(sefl, request):
        serializer = SignUpSerializer(data=request.data)
        resident_no = request.data.get(resident_no)
        phone_no = request.data.get(phone_no)
        cus_nm = request.data.get(cus_pw)
        now = datetime.datetime.now().strftime("%Y-%m-%d")
        email = request.data.get(email)
        address = request.data.get(address)
        cus_pw = hashlib.sha256(request.data.get(cus_pw).encode()).hexdigest()

        try:
            Customer.objects.raw(
                f'SELECT * FROM (SELECT * FROM CUSTOMER WHERE EMAIL=\'{email}\') WHERE ROWNUM=1;'
            )[0]
            
        except IndexError:
            with connection.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO CUSTOMER (RESIDENT_NO, PHONE_NO, CUS_NM, REGI_DATE, EMAIL, ADDRESS, CUS_PW, CUS_GRADE_NO, CUS_POINT)" \
                        f"VALUES ('{resident_no}', '{phone_no}', '{cus_nm}', '{now}', '{email}', '{address}', '{cus_pw}', '{1}', '{0}');"
                )
                res = {
                    'email' : email,
                    'cus_nm' : cus_nm,
                    'cus_grade_no' : 1,
                }
                token = jwt.encode(res, settings.SECRET_KEY, settings.ALGORITHM).decode('utf-8')
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
        cus_pw = hashlib.sha256(request.data.get(cus_pw).encode()).hexdigest()

        response = Response(status=401, data='잘못된 아이디 또는 비밀번호 입니다.')
        try:
            user = Customer.objects.raw(
                f'SELECT * FROM (SELECT * FROM CUSTOMER WHERE EMAIL=\'{email}\') WHERE ROWNUM=1;'
            )[0]
        except IndexError:
            return response
        else:
            if user.cus_pw != cus_pw:
                return response
            
            res = {
                'email' : email,
                'cus_nm' : user.cus_nm,
                'cus_grade_no' : user.cus_grade_no,
            }
            token = jwt.encode(res, settings.SECRET_KEY, settings.ALGORITHM).decode('utf-8')
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