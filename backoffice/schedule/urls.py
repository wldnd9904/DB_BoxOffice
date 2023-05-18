from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import MovieList, MovieDetail, GenreList, GenreDetail, CertificateList, CertificateDetail

urlpatterns=[
    path('movie/',MovieList.as_view()),
    path('movie/<int:pk>/',MovieDetail.as_view()),
    path('genre/',GenreList.as_view()),
    path('genre/<int:pk>/',GenreDetail.as_view()),
    path('certificate/',CertificateList.as_view()),
    path('certificate/<int:pk>/',CertificateDetail.as_view()),
]

urlpatterns=format_suffix_patterns(urlpatterns)