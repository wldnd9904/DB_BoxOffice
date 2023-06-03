from django.urls import path
from django.conf.urls import url, include

from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

from .ticketing_views import (
    MovieList, MovieDetail, User_MovieList, CodeList,
    TheaterList, SeatList, ScheduleList,
    ScheduleDetail,User_ScheduleList,SeatDetail,
    TicketList, TicketDetail,
    )
from .auth_views import AuthViewSet
from .booking_views import BookingViewSet

router = routers.DefaultRouter()
router.register(r'auth', AuthViewSet, basename='auth')
router.register(r'booking', BookingViewSet, basename='booking')

routerpatterns = [
    url(r'^', include(router.urls))
]

urlpatterns=[
    path('movie/',MovieList.as_view()),
    path('movie/user/<int:flag>',User_MovieList.as_view()),
    path('movie/<int:pk>/',MovieDetail.as_view()),
    path('code/<int:no>',CodeList.as_view()),
    path('theater/',TheaterList.as_view()),
    path('seat/<int:thea_no>',SeatList.as_view()),
    path('schedule/',ScheduleList.as_view()),
    path('schedule/<int:pk>',ScheduleDetail.as_view()),
    path('schedule/movie/<int:mov_no>/theater/<int:thea_no>/run_date/<str:run_date>'
         ,User_ScheduleList.as_view()),
    path('seat/<str:seat_no>/theater/<int:thea_no>',SeatDetail.as_view()),
    path('ticket/list/<str:date>',TicketList.as_view()),
    path('ticket/detail/<int:tic_no>',TicketDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns) + routerpatterns