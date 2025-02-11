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
    notes = Note.objects.all().order_by('-updated')
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)


@api_view(['GET','POST'])
def getNote(request,pk):
    notes = Note.objects.get(pk=pk)
    serializer = NoteSerializer(notes, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def updateNote(request,pk):
    data = request.data
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(note, data=data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)