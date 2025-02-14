from django.urls import path
from . import views

urlpatterns = [
    path('note',views.getRoute,name='route'),
    path('api/notes/',views.getNotes,name='notes'),
    path('api/note/create',views.createNote,name='create-notes'),
    path('api/note/<int:pk>/update',views.updateNote,name='update-note'),
    path('api/note/<int:pk>/delete',views.deleteNote,name='delete-note'),
    path('api/note/<int:pk>/',views.getNote,name='note'),

]