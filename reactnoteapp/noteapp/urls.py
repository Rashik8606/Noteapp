from django.urls import path
from . import views

urlpatterns = [
    path('note',views.getRoute,name='route'),
    path('api/notes/',views.getNotes,name='notes'),
    path('api/note/<int:pk>/update',views.updateNote,name='note'),
    path('api/note/<int:pk>/',views.getNote,name='note'),

]