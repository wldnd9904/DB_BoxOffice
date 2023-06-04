import datetime

from modules.auth import getCusno

from django.db import connection

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from .serializers import (
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
                         responses={201: "Successfully reflect reservation and created payment info.", 
                                    400: "Invalid ticket number or discount_seat_string.", 
                                    401: "Unauthorized user."})
    @action(detail=False, methods=['post'])
    def reserve(self, request):
        """
        reserving func for logged in customers.

        Returns:
            Successful responses
                201: Successfully reflected the reservation and created payment info.
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
            discount_list = request.data.get('discount_seat_string').split()[:4]
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
                f"SELECT PRICE FROM TICKET WHERE TIC_NO={tic}"
            )

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
                    f"UPDATE TICKET SET PAY_NO=(SELECT PAYMENT_SEQ.CURRVAL FROM DUAL), CUS_NO={cus_no}, RESERV_DATE=TO_DATE('{now.strftime('%Y-%m-%d %H:%M:%S')}', 'YYYY-MM-DD HH24:MI:SS'), ISSUE=1 WHERE TIC_NO={tic};"
                )
        # }

        return Response(status=201)
    

    @swagger_auto_schema(responses={200: "Successfully generate and return reservation_dic like \n"\
                                        "{ 'pay_no_1': { 'pay_state' : '0', 'pay_amount' : 45000, 'pay_detail' : '3 0 0 0 a12 a13 a14 b19', 'mov_nm' : 'Great movie', 'run_date' : '%Y-%m-%d %H:%M:%S', 'run_end_date' : '%Y-%m-%d %H:%M:%S', 'thea_nm' : 'imax'},\n"\
                                        " 'pay_no_2' : { ... },\n"\
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
                        'pay_no_1': { 'pay_state' : '0', 'pay_amount' : 45000, 'pay_detail' : '3 0 0 0 a12 a13 a14 b19', 'mov_nm' : 'Great movie', 'run_date' : '%Y-%m-%d %H:%M:%S', 'run_end_date' : '%Y-%m-%d %H:%M:%S', 'thea_nm' : 'imax'},
                        'pay_no_2' : { ... },
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

        # { generate {reservation_dic = pay_no_k: {ticket_info_k}}
        res = { }

        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT P.PAY_NO, P.PAY_STATE, P.PAY_AMOUNT, P.PAY_DETAIL, M.MOV_NM, S.RUN_DATE, S.RUN_END_DATE, TH.THEA_NM"\
                    "FROM PAYMENT P, MOVIE M, SCHEDULE S, THEATER TH, TICKET TI "\
                    f"WHERE P.CUS_NO={cus_no} AND P.PAY_NO=TI.PAY_NO AND TI.SCHED_NO=S.SCHED_NO AND S.MOV_NO=M.MOV_NO AND TI.THEA_NO=TH.THEA_NO GROUP BY P.PAY_NO;"
            )
            map(
                lambda p: 
                    res.update({ p[0]: { 'pay_state' : p[1], 
                                          'pay_amount' : p[2], 
                                          'pay_detail' : p[3],
                                          'mov_nm' : p[4],
                                          'run_date' : p[5].strftime("%Y-%m-%d %H:%M:%S"),
                                          'run_end_date' : p[6].strftime("%Y-%m-%d %H:%M:%S"),
                                          'thea_nm' : p[7]
                                          } }), 
                cursor.fetchall()
            )
        # }

        # Remove payment for already screened
        for p in res:
            if datetime.datetime.strptime(res[p]['run_date'], "%Y-%m-%d %H:%M:%S") > datetime.datetime.now():
                with connection.cursor() as cursor:
                    cursor.execute(
                        f"DELETE FROM PAYMENT WHERE PAY_NO={p};"
                    )

                del res[p]
        # }

        return Response(status=200, data=res)
    

    @swagger_auto_schema(responses={200: "Successfully inquire payment method.",  
                                    401: "Unauthorized user."})
    @action(detail=False, methods=['get'])
    def getPaymet(self, request):
        """
        inquiry of payment method for logged in customer.

        Returns:
            Successful responses
                200: Successfully inquire payment method. 
            Client error response
                401: Unauthorized user.
        """
        # { Verification user
        cus_no = getCusno(request)
        if not cus_no:
            return Response(status=401)
        # }

        codes = DetailCode.objects.raw(
                "SELECT * FROM DETAIL_CODE WHERE CODE_NO='CD004';"
            )
        serializer = DetailCodeSerializer(codes, many=True)

        return Response(status=200, data=serializer.data)
    
    @swagger_auto_schema(responses={200: "Successfully inquire customer point. return point.", 
                                    401: "Unauthorized user."})
    @action(detail=False, methods=['get'])
    def getPoint(self, request):
        """
        inquire point method for logged in customer.

        Returns:
            Successful responses
                200: Successfully inquire customer point. return point.
            Client error response
                401: Unauthorized user.
        """
        # { Verification user
        cus_no = getCusno(request)
        if not cus_no:
            return Response(status=401)
        # }

        # { Get customer's point
        point = Customer.objects.raw(
            f"SELECT CUS_POINT FROM CUSTOMER WHERE CUS_NO={cus_no};"
        )
        # }

        return Response(status=200, data=point)

    
    @swagger_auto_schema(query_serializer=PaySerializer, 
                         responses={200: "Successfully processed payment.", 
                                    400: "Invalid arguments include lack of points.", 
                                    401: "Unauthorized user."})
    @action(detail=False, methods=['post'])
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

        response = Response(status=400)

        try:
            Payment.objects.raw(
                f"SELECT CUS_NO FROM PAYMENT WHERE PAY_NO={request.data.get('pay_no')}"
            )[0]
        except IndexError:
            return response
        
        pay_no = request.data.get('pay_no')
        pay_met_no = request.data.get('pay_met_no')
        now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        pay_point = request.data.get('pay_point')
        # }

        # { Check customer point
        if pay_point:
            now_point = Customer.objects.raw(
                f"SELECT CUS_POINT FROM CUSTOMER WHERE CUS_NO={cus_no};"
            )
            if now_point < pay_point:
                return response
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
            f"SELECT PAY_AMOUNT FROM PAYMENT WHERE PAY_NO={pay_no};"
        ) / 10)
        with connection.cursor() as cursor:
            cursor.execute(
                f"UPDATE CUSTOMER SET CUS_POINT=CUS_POINT+{point}-{pay_point} WHERE PAY_NO={pay_no};"
            )
        # }

        return Response(status=200)