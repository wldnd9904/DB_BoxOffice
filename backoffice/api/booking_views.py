import datetime
import hashlib
import jwt

from modules.auth import getCusno

from django.conf import settings
from django.db import connection

from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from .serializers import (
    PaymentSerializer
    )

from .models import (
    Customer,
    Ticket,
    Payment
    )


class BookingViewSet(viewsets.ViewSet):
    """
    ViewSet for customers logged in to book and pay.
    """

    @swagger_auto_schema(manual_parameters=[openapi.Parameter('tic_no_string', openapi.IN_QUERY, description='One string from zero or more tic_no-s separated by spaces', type=openapi.TYPE_STRING), 
                                            openapi.Parameter('discount_string', openapi.IN_QUERY, description='One string from 4 integers separated by spaces. each integer represnets, adult, teen, senior, disabled in order.', type=openapi.TYPE_STRING)], 
                         responses={201: "Successfully reflect reservation and created payment info.", 
                                    400: "Invalid ticket number or discount_string.", 
                                    401: "Unauthorized user."})
    @action(detail=False, methods=['post'])
    def reserve(self, request):
        """
        reserving func for logged in customers.

        Returns:
            Successful responses
                201: Successfully reflected the reservation and created payment info. return payment list about cus_no.
            Client error response
                400: Invalid ticket number or discount_string.
                401: Unauthorized user.
        """
        # { Verification user
        cus_no = getCusno(request)
        if not cus_no:
            return Response(status=401)
        # }

        response = Response(status=400)

        # Input check {
        try:
            tic_no_list = request.data.get('tic_no_string').split()
            tic_no_list[0]
        except AttributeError or IndexError:
            return response
        
        try:
            discount_list = int(request.data.get('discount_string').split())
        except AttributeError:
            return response
        if len(discount_list) != 4:
            return response
        
        discount_no = sum(discount_list) - discount_list[0]
        # }

        # { Caculate total price
        bill = 0
        for tic in tic_no_list:
            bill += Ticket.objects.raw(
                f"SELECT PRICE FROM TICKET WHERE TIC_NO={tic}"
            )

        bill -= discount_no * 2000
        # }

        # { Create Payment table
        with connection.cursor() as cursor:
            cursor.execute(
                f"INSERT INTO PAYMENT VALUES(PAYMENT_SEQ.NEXTVAL, {cus_no}, NULL, 0, {bill}, NULL, NULL, {request.data.get('tic_no_string')});"
            )
        #}
        
        # { Update Ticket table and caculate total price
        now = datetime.datetime.now()
        
        for tic in tic_no_list:
            try:
                run_date = Ticket.objects.raw(
                    f"SELECT TO_CHAR(RUN_DATE, 'YYYY-MM-DD HH24:MI:SS') FROM (SELECT RUN_DATE FROM TICKET WHERE TIC_NO={tic}) WHERE ROWNUM=1;"
                )[0]
            except IndexError:
                return response
            else:
                if datetime.datetime.strptime(run_date, '%Y-%m-%d %H:%M:%S') < now.strptime('%Y-%m-%d %H:%M:%S'):
                    return response
            
        for tic in tic_no_list:
            with connection.cursor() as cursor:
                cursor.execute(
                    f"UPDATE TICKET SET PAY_NO=(SELECT PAYMENT_SEQ.CURRVAL FROM DUAL), CUS_NO={cus_no}, RESERV_DATE=TO_DATE('{now.strftime('%Y-%m-%d %H:%M:%S')}', 'YYYY-MM-DD HH24:MI:SS'), ISSUE=1 WHERE TIC_NO={tic};"
                )
        # }

        payments = Payment.objects.raw(
            f"SELECT * FROM PAYMENT WHERE CUS_NO={cus_no};"
        )
        serializer = PaymentSerializer(payments, many = True)

        return Response(status=201, data=serializer.data)