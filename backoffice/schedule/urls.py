from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import MovieList, MovieDetail

urlpatterns=[
    path('movie/',MovieList.as_view()),
    path('movie/<int:pk>/',MovieDetail.as_view()),
]

urlpatterns=format_suffix_patterns(urlpatterns)