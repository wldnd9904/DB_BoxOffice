from django.contrib import admin
from .models import Movie, Genre, Certificate

# Register your models here.
admin.site.register(Movie)
admin.site.register(Genre)
admin.site.register(Certificate)