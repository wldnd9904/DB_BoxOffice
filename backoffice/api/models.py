# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

class Movie(models.Model):
    mov_no = models.IntegerField(primary_key=True)
    mov_nm = models.CharField(max_length=100)
    run_time_min = models.IntegerField()
    mov_grade_no = models.CharField(max_length=7)
    dir_nm = models.CharField(max_length=50)
    act_nm = models.CharField(max_length=150, blank=True, null=True)
    mov_detail = models.CharField(max_length=1200, blank=True, null=True)
    distributor = models.CharField(max_length=100, blank=True, null=True)
    lang = models.CharField(max_length=30)
    image_url = models.CharField(max_length=200)
    gen_no = models.CharField(max_length=7)
    release_date = models.DateField()

    class Meta:
        managed =False
        db_table = 'movie'


class Schedule(models.Model):
    sched_no = models.IntegerField(primary_key=True)
    mov_no = models.ForeignKey(Movie, models.DO_NOTHING, db_column='mov_no', blank=True, null=True)
    thea_no = models.ForeignKey('Theater', models.DO_NOTHING, db_column='thea_no', blank=True, null=True)
    run_date = models.DateTimeField(blank=True, null=True)
    run_round = models.IntegerField(blank=True, null=True)
    run_type = models.CharField(max_length=30)
    run_end_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'schedule'


class Ticket(models.Model):
    tic_no = models.IntegerField(primary_key=True)
    sched_no = models.ForeignKey(Schedule, models.DO_NOTHING, db_column='sched_no')
    seat_no = models.ForeignKey('Seat', models.DO_NOTHING, db_column='seat_no', related_name='seat_seat_no')
    thea_no = models.ForeignKey('Seat', models.DO_NOTHING, db_column='thea_no',related_name='seat_theater_no')
    pay_no = models.ForeignKey('Payment', models.DO_NOTHING, db_column='pay_no', blank=True, null=True)
    cus_no = models.ForeignKey('Customer', models.DO_NOTHING, db_column='cus_no', blank=True, null=True)
    price = models.IntegerField()
    reserv_date = models.DateTimeField(blank=True, null=True)
    issue = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'ticket'


class Customer(models.Model):
    cus_no = models.IntegerField(primary_key=True)
    resident_no = models.BigIntegerField()
    phone_no = models.IntegerField()
    cus_nm = models.CharField(max_length=30)
    regi_date = models.DateField(blank=True, null=True)
    email = models.CharField(max_length=100, blank=True, null=True)
    address = models.CharField(max_length=300, blank=True, null=True)
    cus_pw = models.CharField(max_length=64, blank=True, null=True)
    cus_grade_no = models.CharField(max_length=7)
    cus_point = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'customer'


class Payment(models.Model):
    pay_no = models.IntegerField(primary_key=True)
    cus_no = models.ForeignKey(Customer, models.DO_NOTHING, db_column='cus_no')
    pay_met_no = models.CharField(max_length=7)
    pay_state = models.BooleanField(blank=True, null=True)
    pay_amount = models.IntegerField()
    pay_date = models.DateField(blank=True, null=True)
    pay_point = models.IntegerField(blank=True, null=True)
    pay_detail = models.CharField(max_length=1200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'payment'
        #unique_together = (('pay_no', 'cus_no'),)


class Seat(models.Model):
    seat_no = models.CharField(primary_key=True, max_length=3)
    thea_no = models.ForeignKey('Theater', models.DO_NOTHING, db_column='thea_no')
    seat_grade_no = models.CharField(max_length=7)

    class Meta:
        managed = False
        db_table = 'seat'
        unique_together = (('seat_no', 'thea_no'),)


class Theater(models.Model):
    thea_no = models.IntegerField(primary_key=True)
    thea_nm = models.CharField(max_length=30)
    thea_loc = models.CharField(max_length=5)

    class Meta:
        managed = False
        db_table = 'theater'

class DetailCode(models.Model):
    detail_code_no = models.CharField(primary_key=True, max_length=7)
    detail_code_nm = models.CharField(max_length=30)
    code_no = models.CharField(max_length=5)

    class Meta:
        managed = False
        db_table = 'detail_code'