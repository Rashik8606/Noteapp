from django.shortcuts import render
from rest_framework.response import Response
from . models import Note
from .serializer import NoteSerializer
from rest_framework.decorators import api_view
# Create your views here.



def getRoute(request):
    return Response('Our API',safe=False)

@api_view(['GET','POST'])
def getNotes(request):
    notes = Note.objects.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)


@api_view(['GET','POST'])
def getNote(request,pk):
    notes = Note.objects.get(pk=pk)
    serializer = NoteSerializer(notes, many=False)
    return Response(serializer.data)