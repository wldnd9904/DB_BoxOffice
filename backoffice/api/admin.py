from django.contrib import admin
from .models import Movie, Schedule, Ticket, Theater, Seat, Payment, Customer,DetailCode

admin.site.register(Movie)
admin.site.register(Schedule)
admin.site.register(Ticket)
admin.site.register(Theater)
admin.site.register(Seat)
admin.site.register(DetailCode)
admin.site.register(Payment)
admin.site.register(Customer)
