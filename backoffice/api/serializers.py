from rest_framework import serializers
from .models import Movie, Genre, MovGrade, Schedule, Ticket, Theater, Seat, SeatGrade, Payment, PaymentMethod, CusGrade, Customer

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model=Movie
        fields = ('mov_no','mov_nm','run_time_min','mov_grade_no','dir_nm','act_nm','mov_detail',
                  'distributor','lang','image_url','gen_no','release_date')
        
class MovieCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        exclude = ['mov_no']

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model=Genre
        fields = ('gen_no','gen_nm')

class MovGradeSerializer(serializers.ModelSerializer):
    class Meta:
        model=MovGrade
        fields = ('mov_grade_no','mov_grade_nm')

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model=Schedule
        fields = ('sched_no','mov_no','thea_no','run_date','run_round','run_type','run_end_date')

class ScheduleCreateSerializer(serializers.Serializer):
    mov_no = serializers.IntegerField()
    thea_no = serializers.IntegerField()
    run_date = serializers.DateTimeField(
        input_formats=["%Y-%m-%d %H:%M:%S"]
    )
    run_round = serializers.IntegerField()
    run_type = serializers.IntegerField()

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model=Ticket
        fields = ('tic_no','sched_no','seat_no','thea_no','pay_no','cus_no','price','reserv_date','issue')

class TheaterSerializer(serializers.ModelSerializer):
    class Meta:
        model=Theater
        fields = ('thea_no','thea_nm','thea_loc')

class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model=Seat
        fields = ('seat_no','thea_no','seat_grade_no')

class SeatGradeSerializer(serializers.ModelSerializer):
    class Meta:
        model=SeatGrade
        fields = ('seat_grade_no','seat_grade_nm')

class CusGradeSerializer(serializers.ModelSerializer):
    class Meta:
        model=CusGrade
        fields = ('cus_grade_no','cus_grade_nm')

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Customer
        fields = ('cus_no','resident_no','phone_no','cus_nm','regi_date','email','address','cus_pw',
                  'cus_grade_no','cus_point')
        
class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model=PaymentMethod
        fields = ('pay_met_no','pay_met_nm')

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Payment
        fields = ('pay_no','cus_no','pay_met_no','pay_state','pay_amount','pay_date','pay_point',
                  'pay_detail')

#DB instance => JSON data
