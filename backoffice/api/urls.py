from django.urls import path
from django.conf.urls import url, include

from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

from .ticketing_views import (
    MovieList, MovieDetail, User_MovieList, CodeList,
    TheaterList, SeatList, ScheduleList, CodeAllList,
    ScheduleDetail,SeatDetail,
    TicketList, TicketDetail, TheaterDetail,
    )
from .user_views import AuthViewSet, UserViewSet
from .booking_views import BookingViewSet

router = routers.DefaultRouter()
router.register(r'auth', AuthViewSet, basename='auth')
router.register(r'booking', BookingViewSet, basename='booking')
router.register(r'mypage', UserViewSet, basename='mypage')

routerpatterns = [
    url(r'^', include(router.urls))
]

urlpatterns=[
    path('movie/',MovieList.as_view()),
    path('movie/user/<int:flag>',User_MovieList.as_view()),
    path('movie/<int:pk>',MovieDetail.as_view()),
    path('code/<int:no>',CodeList.as_view()),
    path('code/',CodeAllList.as_view()),
    path('theater/',TheaterList.as_view()),
    path('theater/<int:thea_no>',TheaterDetail.as_view()),
    path('seat/<int:thea_no>',SeatList.as_view()),
    path('schedule/',ScheduleList.as_view()),
    path('schedule/<int:pk>',ScheduleDetail.as_view()),
    path('seat/<str:seat_no>/theater/<int:thea_no>',SeatDetail.as_view()),
    path('ticket/list/<int:sched_no>',TicketList.as_view()),
    path('ticket/detail/<int:tic_no>',TicketDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns) + routerpatterns