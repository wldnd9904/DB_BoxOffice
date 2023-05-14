from rest_framework import serializers
from .models import Movie, Genre, Certificate

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model=Movie
        fields = ('movno','movname','runtimemin','certno','dirname','actname','movintro',
                  'distname','lang','imageurl','genno','release_date')
        
class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model=Genre
        fields = ('genno','genname')

class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model=Certificate
        fields = ('certno','certname')
        

#DB instance => JSON data