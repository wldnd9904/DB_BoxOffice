from rest_framework import serializers
from .models import Movie

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model=Movie
        fields = ('movie_no','title','running_time',
                  'descriptions','genre')
# DB instance => JSON data