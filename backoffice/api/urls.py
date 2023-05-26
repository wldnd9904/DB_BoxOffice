from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .ticketing_views import (
    MovieList, MovieDetail, GenreList, MovGradeList,
    TheaterList, SeatList,SeatGradeList,
    )

urlpatterns=[
    path('movie/',MovieList.as_view()),
    path('movie/<int:pk>/',MovieDetail.as_view()),
    path('genre/',GenreList.as_view()),
    path('movgrade/',MovGradeList.as_view()),
    path('theater/',TheaterList.as_view()),
    path('seat/',SeatList.as_view()),
    # path('certificate/',CertificateList.as_view()),
    
]

urlpatterns=format_suffix_patterns(urlpatterns)