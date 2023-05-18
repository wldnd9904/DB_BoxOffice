# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Movie(models.Model):
    movno = models.IntegerField(primary_key=True)
    movname = models.CharField(max_length=100, blank=True, null=True)
    runtimemin = models.IntegerField(blank=True, null=True)
    certno = models.ForeignKey('Certificate', models.DO_NOTHING, db_column='certno', blank=True, null=True)
    dirname = models.CharField(max_length=50, blank=True, null=True)
    actname = models.CharField(max_length=150, blank=True, null=True)
    movintro = models.CharField(max_length=1200, blank=True, null=True)
    distname = models.CharField(max_length=100, blank=True, null=True)
    lang = models.CharField(max_length=50, blank=True, null=True)
    imageurl = models.CharField(max_length=200, blank=True, null=True)
    genno = models.ForeignKey('Genre', models.DO_NOTHING, db_column='genno', blank=True, null=True)
    release_date = models.CharField(max_length=10, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'movie'


class Genre(models.Model):
    genno = models.IntegerField(primary_key=True)
    genname = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'genre'


class Certificate(models.Model):
    certno = models.IntegerField(primary_key=True)
    certname = models.CharField(max_length=30, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'certificate'
