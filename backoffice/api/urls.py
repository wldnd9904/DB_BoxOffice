from django.urls import path
from django.conf.urls import url, include

from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

from .ticketing_views import (
    MovieList, MovieDetail, CodeList,
    TheaterList, SeatList, ScheduleList,
    ScheduleDetail,User_ScheduleList,SeatDetail,
    )
from .auth_views import (
    AuthViewSet
)

auth = routers.DefaultRouter()
auth.register(r'', AuthViewSet, basename='auth')

urlpatterns=[
    path('movie/',MovieList.as_view()),
    path('movie/<int:pk>/',MovieDetail.as_view()),
    path('code/<int:no>',CodeList.as_view()),
    path('theater/',TheaterList.as_view()),
    path('seat/',SeatList.as_view()),
    path('schedule/',ScheduleList.as_view()),
    path('schedule/<int:pk>',ScheduleDetail.as_view()),
    path('schedule/movie/<int:mov_no>/theater/<int:thea_no>/run_date/<str:run_date>'
         ,User_ScheduleList.as_view()),
    path('seat/<str:seat_no>/theater/<int:thea_no>',SeatDetail.as_view()),
]

routerpatterns = [
    url(r'^auth/', include(auth.urls))
]

urlpatterns = format_suffix_patterns(urlpatterns) + routerpatterns