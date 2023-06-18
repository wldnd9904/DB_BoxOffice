import datetime
import json

from modules.auth import getCusno, getCusGradeNo

from django.db import connection, transaction

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from .serializers import (
    PaymentSerializer,
    PaySerializer,
    DetailCodeSerializer
    )

from .models import (
    Customer,
    Ticket,
    Payment,
    DetailCode
    )


class BookingViewSet(viewsets.ViewSet):
    """
    ViewSet for customers logged in to book and pay.
    """

    @swagger_auto_schema(manual_parameters=[openapi.Parameter('tic_no_string', openapi.IN_QUERY, description='One string from zero or more tic_no-s separated by spaces', type=openapi.TYPE_STRING), 
                                            openapi.Parameter('discount_seat_string', openapi.IN_QUERY, description='One string from 4 integers and seat nums separated by spaces. each of the first four integer means adult, teen, senior, and disabled in order.', type=openapi.TYPE_STRING)], 
                         responses={201: "Successfully reflect reservation and created payment info, return pay_no.", 
                                    400: "Invalid ticket number or discount_seat_string.", 
                                    401: "Unauthorized user."})
    @action(detail=False, methods=['post'])
    @transaction.atomic
    def reserve(self, request):
        """
        reserving func for logged in customers.

        Returns:
            Successful responses
                201: Successfully reflected the reservation and created payment info, return pay_no.
            Client error response
                400: Invalid ticket number or discount_seat_string.
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
            discount_list = list( map(
                int,
                request.data.get('discount_seat_string').split()[:4]
            ))
        except AttributeError:
            return response
        if len(discount_list) != 4 or sum(discount_list) != len(tic_no_list):
            return response
        
        discount_no = sum(discount_list) - discount_list[0]
        # }

        # { Caculate total price
        bill = 0
        for tic in tic_no_list:
            bill += Ticket.objects.raw(
                f"SELECT TIC_NO, PRICE FROM TICKET WHERE TIC_NO={tic}"
            )[0].price

        bill -= discount_no * 2000
        # }

        # { Create Payment table
        with connection.cursor() as cursor:
            cursor.execute(
                f"INSERT INTO PAYMENT VALUES(PAYMENT_SEQ.NEXTVAL, {cus_no}, NULL, 0, {bill}, NULL, NULL, '{request.data.get('discount_seat_string')}');"
            )
        #}
        
        # { Update Ticket table
        now = datetime.datetime.now()
            
        for tic in tic_no_list:
            with connection.cursor() as cursor:
                cursor.execute(
                    "SELECT PAYMENT_SEQ.CURRVAL FROM DUAL;"
                )
                payment_seq = cursor.fetchone()[0]
                cursor.execute(
                    f"UPDATE TICKET SET PAY_NO={payment_seq}, CUS_NO={cus_no}, RESERV_DATE=TO_DATE('{now.strftime('%Y-%m-%d %H:%M:%S')}', 'YYYY-MM-DD HH24:MI:SS'), ISSUE=1 WHERE TIC_NO={tic};"
                )
        # }

        return Response(status=201, data=payment_seq)
    

    @swagger_auto_schema(responses={200: "Successfully generate and return reservation_dic like {\n"\
                                        "{ 'pay_no': 6, 'pay_met_no': None, 'pay_state': 0, 'pay_amount': 39000, 'pay_date': None, 'pay_detail': '3 0 0 0 A8 B3 B4', 'pay_point': None, 'mov_no': 4, 'run_type': '2D', 'run_date': '2023-06-07 14:11:00', 'run_end_date': '2023-06-07 15:56:00', 'thea_nm': '1관', 'thea_loc': '8층', 'cus_no': 3 },\n"\
                                        "{ 'pay_no_2', ... },\n"\
                                        " ...}\n"\
                                        "or empty data.",
                                    401: "Unauthorized user."})
    @action(detail=False, methods=['get'])
    def confirmReserv(self, request):
        """
        confirm reservations for logged in customer.

        Returns:
            Successful responses
                200: Successfully generate and return reservation_dic like
                    {
                        { 'pay_no': 6, 'pay_met_no': None, 'pay_state': 0, 'pay_amount': 39000, 'pay_date': None, 'pay_detail': '3 0 0 0 A8 B3 B4', 'pay_point': None, 'mov_no': 4, 'run_type': '2D', 'run_date': '2023-06-07 14:11:00', 'run_end_date': '2023-06-07 15:56:00', 'thea_nm': '1관', 'thea_loc': '8층', 'cus_no': 3 },
                        { 'pay_no_2', ... },
                        ...
                    }
                    or empty data.
            Client error response
                401: Unauthorized user.
        """
        # { Verification user
        cus_no = getCusno(request)
        if not cus_no:
            return Response(status=401)
        # }

        # { generate result
        with connection.cursor() as cursor:
            cursor.execute(
                f"SELECT DISTINCT * FROM V_TICKET V, PAYMENT P WHERE P.CUS_NO={cus_no} AND P.PAY_NO=V.PAY_NO;"
            )
            rows = cursor.fetchall()

            res_list=[]
            for row in rows:
                row_dict = dict(zip([col[0].lower() for col in cursor.description], row))

                for key, value in row_dict.items():
                    if isinstance(value, datetime.datetime):
                        row_dict[key] = value.strftime("%Y-%m-%d %H:%M:%S")

                json_data = json.dumps(row_dict)
                res_list.append(json.loads(json_data))
        # }

        return Response(status=200, data=res_list)
    
    @swagger_auto_schema(manual_parameters=[openapi.Parameter('pay_no', openapi.IN_QUERY, type=openapi.TYPE_INTEGER)], 
                         responses={200: "Successfully reflected reservation cancellation.", 
                                    401: "Unauthorized user."})
    @action(detail=False, methods=['post'])
    @transaction.atomic
    def cancelReserv(self, request):
        """
        cancel reservations for logged in customer.

        Returns:
            Successful responses
                200: Successfully reflected reservation cancellation.
            Client error response
                401: Unauthorized user.
        """
        # { Verification user
        cus_no = getCusno(request)
        if not cus_no:
            return Response(status=401)
        # }

        # { Update Ticket and delete Payment.
        pay_no = request.data.get('pay_no')

        with connection.cursor() as cursor:
            cursor.execute(
                f"UPDATE TICKET SET PAY_NO=NULL, CUS_NO=NULL, ISSUE=0 WHERE PAY_NO={pay_no};"
            )
            cursor.execute(
                f"DELETE FROM PAYMENT WHERE PAY_NO={pay_no};"
            )
        # }

        return Response(status=200)
    
    @swagger_auto_schema(query_serializer=PaySerializer, 
                         responses={200: "Successfully processed payment.", 
                                    400: "Invalid arguments include lack of points.", 
                                    401: "Unauthorized user."})
    @action(detail=False, methods=['post'])
    @transaction.atomic
    def pay(self, request):
        """
        pay bill for logged in customer.

        Returns:
            Successful responses
                200: Successfully processed payment. 
            Client error response
                400: Invalid arguments include lack of points.
                401: Unauthorized user.
        """
        # { Verification user
        cus_no = getCusno(request)
        if not cus_no:
            return Response(status=401)
        # }

        # { Input check
        serializer = PaySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        pay_no = request.data.get('pay_no')
        pay_met_no = request.data.get('pay_met_no')
        now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        pay_point = int(request.data.get('pay_point'))

        pay_state = Payment.objects.raw(
            f"SELECT PAY_NO, PAY_STATE FROM PAYMENT WHERE PAY_NO={pay_no};"
        )[0].pay_state

        if int(pay_state) == 1:
            return Response(status=400, data="이미 처리된 결제입니다.")
        # }

        # { Check customer point
        if pay_point:
            now_point = Customer.objects.raw(
                f"SELECT CUS_NO, CUS_POINT FROM CUSTOMER WHERE CUS_NO={cus_no};"
            )[0].cus_point
            if now_point < pay_point:
                return Response(status=400, data="포인트가 부족합니다.")
        # }

        # { Update Payment table
        with connection.cursor() as cursor:
            cursor.execute(
                f"UPDATE PAYMENT SET PAY_MET_NO='{pay_met_no}', PAY_STATE=1, PAY_DATE=TO_DATE('{now}', 'YYYY-MM-DD HH24:MI:SS'), PAY_POINT={pay_point} WHERE PAY_NO={pay_no};"
            )
        # }

        # { Update Ticket table
        with connection.cursor() as cursor:
            cursor.execute(
                f"UPDATE TICKET SET ISSUE=2 WHERE PAY_NO={pay_no};"
            )
        # }

        # { Deduction of points and 10% of the payment_amount is returned as points
        point = int(Payment.objects.raw(
            f"SELECT PAY_NO, PAY_AMOUNT FROM PAYMENT WHERE PAY_NO={pay_no};"
        )[0].pay_amount / 10)
        with connection.cursor() as cursor:
            cursor.execute(
                f"UPDATE CUSTOMER SET CUS_POINT=CUS_POINT+{point}-{pay_point} WHERE CUS_NO={cus_no};"
            )
        # }

        return Response(status=200, data="결제 성공!")
    

    @swagger_auto_schema(manual_parameters=[openapi.Parameter('pay_no', openapi.IN_QUERY, type=openapi.TYPE_INTEGER)], 
                         responses={200: "Successfully inquire seat info, return seat info.", 
                                    400: "Invalid arguments.", 
                                    401: "Unauthorized user."})
    @action(detail=False, methods=['post'])
    @transaction.atomic
    def getSeatInfo(self, request):
        """
        inquire seat info for logged in customer.

        Returns:
            Successful responses
                200: Successfully inquire seat info, return seat info.
            Client error response
                400: Invalid arguments.
                401: Unauthorized user.
        """
        # { Verification user
        cus_no = getCusno(request)
        if not cus_no:
            return Response(status=401)
        
        pay_no = request.data.get('pay_no')
        # }

        # { Check customer point
        with connection.cursor() as cursor:
            cursor.execute(
                f"SELECT DETAIL_CODE_NM, PRICE, COUNT(DETAIL_CODE_NM) FROM (SELECT * FROM V_SEAT_INFO WHERE PAY_NO={pay_no}) GROUP BY DETAIL_CODE_NM, PRICE;"
            )
            res = cursor.fetchall()

            data = []
            for row in res:
                data.append({
                    'seat': row[0],
                    'price': row[1],
                    'count': row[2]
        })
        # }

        return Response(status=200, data=data)
    
    @swagger_auto_schema(responses={200: "Successfully inquire payment list. return it.",
                                    401: "Unauthorized user."})
    @action(detail=False, methods=['get'])
    def getAllPayments(self, request):
        """
        inquire payment list for staff.

        Returns:
            Successful responses
                200: Successfully inquire payment list. return it.
            Client error response
                401: Unauthorized user.
        """
        response = Response(status=401)

        # { Verification user
        cus_no = getCusno(request)
        if not cus_no:
            return response

        payments = Payment.objects.raw(
            "SELECT * FROM PAYMENT;"
        )
        serializer = PaymentSerializer(payments, many=True)
        
        return Response(status=200, data=serializer.data)