from django.urls import path
from . import views

urlpatterns = [
    path('note',views.getRoute,name='route'),
    path('getnotes/',views.getNotes,name='notes'),
    path('getnotes/<str:pk>',views.getNote,name='note'),

]