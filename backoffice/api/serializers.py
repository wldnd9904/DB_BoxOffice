from rest_framework import serializers
from .models import Movie, Schedule, Ticket, Theater, Seat, Payment, Customer

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model=Movie
        fields = ('mov_no','mov_nm','run_time_min','mov_grade_no','dir_nm','act_nm','mov_detail',
                  'distributor','lang','image_url','gen_no','release_date')

class MovieNoPKSerializer(serializers.ModelSerializer):
    class Meta:
        model=Movie
        exclude=('mov_no',)

class DetailCodeSerializer(serializers.Serializer):
    detail_code_no=serializers.CharField(min_length=7 ,max_length=7)
    detail_code_nm=serializers.CharField(max_length=20)
    code_no=serializers.CharField(min_length=5 ,max_length=5)

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model=Schedule
        fields = ('sched_no','mov_no','thea_no','run_round','run_type','run_date','run_end_date')

class SchedulePostSerializer(serializers.Serializer):
    sched_no = serializers.IntegerField()
    mov_no = serializers.IntegerField()
    thea_no = serializers.IntegerField()
    run_date = serializers.DateTimeField()
    run_round = serializers.IntegerField()
    run_type = serializers.CharField(max_length=30)
    run_end_date = serializers.DateTimeField()
    CD00501 = serializers.IntegerField()
    CD00502 = serializers.IntegerField()
    CD00503 = serializers.IntegerField()
    CD00504 = serializers.IntegerField()

class ScheduleNoPKSerializer(serializers.ModelSerializer):
    class Meta:
        model=Schedule
        exclude = ('sched_no',)

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model=Ticket
        fields = ('tic_no','sched_no','seat_no','thea_no','pay_no','cus_no','price','reserv_date','issue')

class TicketPutSerializer(serializers.ModelSerializer):
    class Meta:
        model=Ticket
        exclude=('tic_no','sched_no','seat_no','thea_no',)

class TheaterSerializer(serializers.ModelSerializer):
    class Meta:
        model=Theater
        fields = ('thea_no','thea_nm','thea_loc')

class TheaterPutSerializer(serializers.ModelSerializer):
    class Meta:
        model=Theater
        exclude=('thea_no',)

class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model=Seat
        fields = ('seat_no','thea_no','seat_grade_no')

class SeatPostSerializer(serializers.Serializer):
    seat_no=serializers.CharField()
    thea_no=serializers.IntegerField()
    seat_grade_no=serializers.CharField()


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Customer
        fields = ('cus_no','resident_no','phone_no','cus_nm','regi_date','email','address','cus_pw',
                  'cus_grade_no','cus_point')
        
class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Payment
        fields = ('pay_no','cus_no','pay_met_no','pay_state','pay_amount','pay_date','pay_point',
                  'pay_detail')

# auth_view.py
class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('resident_no', 'phone_no', 'cus_nm', 'email', 'address', 'cus_pw')

class LogInSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('email', 'cus_pw')

class NSignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('resident_no', 'phone_no', 'cus_nm', 'cus_pw')

class NLogInSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('phone_no', 'cus_pw')

# purchase_view.py
class PaySerializer(serializers.Serializer):
    class Meta:
        model = Payment
        fields = ('pay_no', 'pay_met_no', 'pay_point')