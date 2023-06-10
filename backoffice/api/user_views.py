import datetime
import hashlib
import jwt

from modules.auth import getCusno, getCusGradeNo

from django.conf import settings
from django.db import connection
from django.http.response import HttpResponse
from django.core.serializers import serialize

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from drf_yasg.utils import swagger_auto_schema

from .serializers import (
    SignUpSerializer,
    LogInSerializer,
    NSignUpSerializer,
    NLogInSerializer,
    CustomerSerializer
    )

from .models import (
    Customer
    )


class AuthViewSet(viewsets.ViewSet):
    """
    ViewSet for staff, customers including member, non-member to Log in, Log out, and Sign up.
    """
    
    # { Staff
    @swagger_auto_schema(query_serializer=LogInSerializer, 
                         responses={200: "Response with token: { 'cus_no' : user.cus_no, 'id' : email, 'cus_grade_no' : 'CD00300' }",
                                    400: "Raise ValidationError at serializer.is_valid.",
                                    401: "Failed to look up account by email or password dont match in DB."})
    @action(detail=False, methods=['post'])
    def slogin(self, request):
        """
        log in func for staff

        Returns:
            Successful responses
                200: Response with token: 
                    {
                        'cus_no' : user.cus_no,
                        'id' : email,
                        'cus_grade_no' : 'CD00300'
                    }
            Client error response
                400: Raise ValidationError at serializer.is_valid.
                401: Failed to look up account by email or password dont match in DB.

        Note:
            Assumed staff account has already been created.
        """
        serializer = LogInSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = request.data.get('email')
        cus_pw = hashlib.sha256(request.data.get('cus_pw').encode()).hexdigest()

        response = Response(status=401, data='Incorrect ID or password.')

        try:
            user = Customer.objects.raw(
                f"SELECT * FROM (SELECT * FROM CUSTOMER WHERE EMAIL='{email}' AND CUS_GRADE_NO='CD00300') WHERE ROWNUM=1;"
            )[0]
        except IndexError:
            return response
        else:
            if user.cus_pw != cus_pw:
                return response
            
            res = {
                'cus_no' : user.cus_no,
                'id' : email,
                'cus_grade_no' : 'CD00300'
            }

            token = jwt.encode(res, settings.SECRET_KEY, settings.ALGORITHM)
            response = Response(status=200, data=token)
            response.set_cookie('jwt', token, httponly=False)

            return response
    # }

    # { Member
    @swagger_auto_schema(query_serializer=SignUpSerializer, 
                         responses={201: "Successfully created an account, response with token: { 'cus_no' : user.cus_no, 'id' : email, 'cus_grade_no' : 'CD00302' }",
                                    400: "Raise ValidationError at serializer.is_valid.",
                                    409: "Already exist account signed up with received email or phone_no.",
                                    500: "Sequential problem of DB access."})
    @action(detail=False, methods=['post'])
    def signup(self, request):
        """
        sign up func for member.

        Returns:
            Successful responses
                201: Response with token: 
                    {
                        'cus_no' : user.cus_no,
                        'id' : email,
                        'cus_grade_no' : 'CD00302'
                    }
            Client error response
                400: Raise ValidationError at serializer.is_valid.
                409: Already exist account signed up with received email or phone_no.
            Server error responses
                500: Sequential problem of DB access.
        """
        serializer = SignUpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        resident_no = request.data.get('resident_no')
        phone_no = request.data.get('phone_no')
        cus_nm = request.data.get('cus_nm')
        now = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        email = request.data.get('email')
        address = request.data.get('address')
        cus_pw = hashlib.sha256(request.data.get('cus_pw').encode()).hexdigest()

        try:
            Customer.objects.raw(
                f"SELECT * FROM (SELECT * FROM CUSTOMER WHERE PHONE_NO={phone_no}) WHERE ROWNUM=1;"
            )[0]
        except IndexError:
            try:
                Customer.objects.raw(
                    f"SELECT * FROM (SELECT * FROM CUSTOMER WHERE EMAIL='{email}') WHERE ROWNUM=1;"
                )[0]
            except IndexError:
                with connection.cursor() as cursor:
                    cursor.execute(
                        "INSERT INTO CUSTOMER (CUS_NO, RESIDENT_NO, PHONE_NO, CUS_NM, REGI_DATE, EMAIL, ADDRESS, CUS_PW, CUS_GRADE_NO, CUS_POINT)" \
                            f"VALUES (CUSTOMER_SEQ.NEXTVAL, {resident_no}, {phone_no}, '{cus_nm}', TO_DATE('{now}', 'YYYY-MM-DD HH24:MI:SS'), '{email}', '{address}', '{cus_pw}', 'CD00302', 0);"
                    )

                    try:
                        user = Customer.objects.raw(
                            f"SELECT * FROM (SELECT * FROM CUSTOMER WHERE EMAIL='{email}') WHERE ROWNUM=1;"
                        )[0]
                    except IndexError:
                        return Response(status=500)
                    
                    res = {
                        'cus_no' : user.cus_no,
                        'id' : email,
                        'cus_grade_no' : 'CD00302'
                    }

                    token = jwt.encode(res, settings.SECRET_KEY, settings.ALGORITHM)
                    response = Response(status=201, data=token)
                    response.set_cookie('jwt', token, httponly=False)

                    return response
            
        return Response(status=409, data='The ID already exists.')
    
    @swagger_auto_schema(query_serializer=LogInSerializer, 
                         responses={200: "Response with token: { 'cus_no' : user.cus_no, 'id' : email, 'cus_grade_no' : 'CD00302' }",
                                    400: "Raise ValidationError at serializer.is_valid.",
                                    401: "Failed to look up account by email or password dont match in DB."})
    @action(detail=False, methods=['post'])
    def login(self, request):
        """
        log in func for member.

        Returns:
            Successful responses
                200: Response with token: 
                    {
                        'cus_no' : user.cus_no,
                        'id' : email,
                        'cus_grade_no' : 'CD00302'
                    }
            Client error response
                400: Raise ValidationError at serializer.is_valid.
                401: Failed to look up account by email or password dont match in DB.
        """
        serializer = LogInSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = request.data.get('email')
        cus_pw = hashlib.sha256(request.data.get('cus_pw').encode()).hexdigest()

        response = Response(status=401, data='Incorrect ID or password.')

        try:
            user = Customer.objects.raw(
                f"SELECT * FROM (SELECT * FROM CUSTOMER WHERE EMAIL='{email}' AND CUS_GRADE_NO='CD00302') WHERE ROWNUM=1;"
            )[0]
        except IndexError:
            return response
        else:
            if user.cus_pw != cus_pw:
                return response
            
            res = {
                'cus_no' : user.cus_no,
                'id' : email,
                'cus_grade_no' : 'CD00302'
            }

            token = jwt.encode(res, settings.SECRET_KEY, settings.ALGORITHM)
            response = Response(status=200, data=token)
            response.set_cookie('jwt', token, httponly=False)

            return response
    # }

    # { Non-member
    @swagger_auto_schema(query_serializer=NSignUpSerializer, 
                         responses={201: "Successfully created an account, response with token: { 'cus_no' : user.cus_no, 'id' : phone_no, 'cus_grade_no' : 'CD00301' }",
                                    400: "Raise ValidationError at serializer.is_valid.",
                                    409: "Already exist account signed up with received phone_no.",
                                    500: "Sequential problem of DB access."})
    @action(detail=False, methods=['post'])
    def nsignup(self, request):
        """
        sign up func for non-member.

        Returns:
            Successful responses
                201: Response with token: 
                    {
                        'cus_no' : user.cus_no,
                        'id' : phone_no,
                        'cus_grade_no' : 'CD00301'
                    }
            Client error response
                400: Raise ValidationError at serializer.is_valid.
                409: Already exist account signed up with received phone_no.
            Server error responses
                500: Sequential problem of DB access.
        """
        serializer = NSignUpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        resident_no = request.data.get('resident_no')
        phone_no = request.data.get('phone_no')
        cus_nm = request.data.get('cus_nm')
        now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        cus_pw = hashlib.sha256(request.data.get('cus_pw').encode()).hexdigest()

        try:
            Customer.objects.raw(
                f"SELECT * FROM (SELECT * FROM CUSTOMER WHERE PHONE_NO={phone_no}) WHERE ROWNUM=1;"
            )[0]
        except IndexError:
            with connection.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO CUSTOMER (CUS_NO, RESIDENT_NO, PHONE_NO, CUS_NM, REGI_DATE, CUS_PW, CUS_GRADE_NO)" \
                        f"VALUES (CUSTOMER_SEQ.NEXTVAL, {resident_no}, {phone_no}, '{cus_nm}', TO_DATE('{now}', 'YYYY-MM-DD HH24:MI:SS'), '{cus_pw}', 'CD00301');"
                )

                try:
                    user = Customer.objects.raw(
                        f'SELECT * FROM (SELECT * FROM CUSTOMER WHERE PHONE_NO={phone_no}) WHERE ROWNUM=1;'
                    )[0]
                except IndexError:
                    return Response(status=500)
                
                res = {
                    'cus_no' : user.cus_no,
                    'id' : phone_no,
                    'cus_grade_no' : 'CD00301'
                }

                token = jwt.encode(res, settings.SECRET_KEY, settings.ALGORITHM)
                response = Response(status=201, data=token)
                response.set_cookie('jwt', token, httponly=False)

                return response
            
        return Response(status=409, data='이미 존재하는 계정 입니다.')
    
    # Log In
    @swagger_auto_schema(query_serializer=NLogInSerializer, 
                         responses={200: "Response with token: { 'cus_no' : user.cus_no, 'id' : phone_no, 'cus_grade_no' : 'CD00301' }", 
                                    400: "Raise ValidationError at serializer.is_valid.",
                                    401: "Failed to look up account by phone_no or password dont match in DB."})
    @action(detail=False, methods=['post'])
    def nlogin(self, request):
        """
        log in func for non-member.

        Returns:
            Successful responses
                200: Response with token: 
                    {
                        'cus_no' : user.cus_no,
                        'id' : phone_no,
                        'cus_grade_no' : 'CD00301'
                    }
            Client error response
                400: Raise ValidationError at serializer.is_valid.
                401: Failed to look up account by phone_no or password dont match in DB.
        """
        serializer = NLogInSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        phone_no = request.data.get('phone_no')
        cus_pw = hashlib.sha256(request.data.get('cus_pw').encode()).hexdigest()

        response = Response(status=401, data='Incorrect Phone number or password.')

        try:
            user = Customer.objects.raw(
                f"SELECT * FROM (SELECT * FROM CUSTOMER WHERE PHONE_NO={phone_no} AND CUS_GRADE_NO='CD00301') WHERE ROWNUM=1;"
            )[0]
        except IndexError:
            return response
        else:
            if user.cus_pw != cus_pw:
                return response
            
            res = {
                'cus_no' : user.cus_no,
                'id' : phone_no,
                'cus_grade_no' : 'CD00301'
            }

            token = jwt.encode(res, settings.SECRET_KEY, settings.ALGORITHM)
            response = Response(status=200, data=token)
            response.set_cookie('jwt', token, httponly=False)

            return response
    # }
        
    @swagger_auto_schema(responses={200: "Response without token."})
    @action(detail=False, methods=['post'])
    def logout(self, request):
        """
        logout func for all.

        Returns:
            Successful responses
                200: Response without token
        """
        response = HttpResponse(status=200)
        response.delete_cookie('jwt')
        
        return response
    

class UserViewSet(viewsets.ViewSet):
    """
    ViewSet for staff, members to inquire and update account information.
    """

    @swagger_auto_schema(responses={200: "Successfully inquire account information. return it.",
                                    401: "Unauthorized user."})
    @action(detail=False, methods=['get'])
    def account(self, request):
        """
        inquire account information for logged in user.

        Returns:
            Successful responses
                200: Successfully inquire account information. return it.
            Client error response
                401: Unauthorized user.
        """
        response = Response(status=401)

        # { Verification user
        cus_no = getCusno(request)
        if not cus_no:
            return response
        # }

        try:
            user = Customer.objects.raw(
                f"SELECT * FROM CUSTOMER WHERE CUS_NO={cus_no};"
            )[0]
        except IndexError:
            return response
        
        serializer = CustomerSerializer(user)
        
        return Response(status=200, data=serializer.data)
    
    @swagger_auto_schema(query_serializer=SignUpSerializer, 
                         responses={200: "Successfully inquire account information. return it.",
                                    400: "Raise ValidationError at serializer.is_valid.",
                                    401: "Unauthorized user."})
    @action(detail=False, methods=['post'])
    def updateaccount(self, request):
        """
        update account information for logged in user.

        Returns:
            Successful responses
                200: Successfully update account information. return it.
            Client error response
                400: Raise ValidationError at serializer.is_valid.
                401: Unauthorized user.
        """
        response = Response(status=401)

        # { Verification user
        cus_no = getCusno(request)
        if not cus_no:
            return response
        
        if getCusGradeNo(request) == 'CD00301':
            return response
        # }

        serializer = SignUpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        resident_no = request.data.get('resident_no')
        phone_no = request.data.get('phone_no')
        cus_nm = request.data.get('cus_nm')
        email = request.data.get('email')
        address = request.data.get('address')
        cus_pw = hashlib.sha256(request.data.get('cus_pw').encode()).hexdigest()

        with connection.cursor() as cursor:
            cursor.execute(
                f"UPDATE CUSTOMER SET RESIDENT_NO={resident_no}, PHONE_NO={phone_no}, CUS_NM='{cus_nm}', EMAIL='{email}', ADDRESS='{address}', CUS_PW='{cus_pw}' WHERE CUS_NO={cus_no};"
            )
    
        return Response(status=200)

    @swagger_auto_schema(responses={200: "Successfully inquire user list. return it.",
                                    401: "Unauthorized user."})
    @action(detail=False, methods=['get'])
    def getAllUsers(self, request):
        """
        inquire user list for staff.

        Returns:
            Successful responses
                200: Successfully inquire user list. return it.
            Client error response
                401: Unauthorized user.
        """
        response = Response(status=401)

        # { Verification user
        cus_no = getCusno(request)
        if not cus_no:
            return response
        
        # if getCusGradeNo(request) != 'CD00300':
        #     return response
        # }

        users = Customer.objects.raw(
            "SELECT * FROM CUSTOMER;"
        )
        serializer = CustomerSerializer(users, many=True)
        
        return Response(status=200, data=serializer.data)