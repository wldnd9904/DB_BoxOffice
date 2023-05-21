from django.contrib import admin
from .models import Movie, Genre, MovGrade, Schedule, Ticket, Theater, Seat, SeatGrade, Payment, PaymentMethod, CusGrade, Customer

admin.site.register(Movie)
admin.site.register(Genre)
admin.site.register(MovGrade)
admin.site.register(Schedule)
admin.site.register(Ticket)
admin.site.register(Theater)
admin.site.register(Seat)
admin.site.register(SeatGrade)
admin.site.register(Payment)
admin.site.register(PaymentMethod)
admin.site.register(CusGrade)
admin.site.register(Customer)
