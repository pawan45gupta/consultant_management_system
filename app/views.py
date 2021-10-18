from django.template import loader
from app.models import Consultant
from django.http import HttpResponse
from django.db import models
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render
from .serializers import ConsultantSerializer
from rest_framework import viewsets
from django.core.serializers import serialize
from django.http import JsonResponse
from django.views.generic import View


# @api_view(['GET'])
class ConsultantView(viewsets.ModelViewSet):
    serializer_class = ConsultantSerializer
    queryset = Consultant.objects.all()

def index(request):
    result = Consultant.objects.values()
    # l = request.user.groups.values_list('name', flat=True)  # QuerySet Object
    # l_as_list = list(l)
    # if user.groups.filter(name='groupname').exists():
    # # Action if existing
    #
    # else:
    # # Action if not existing
    # print(l_as_list, request.user.groups)
    # Consultant.add_to_class(
    #     '%s_title',
    #     models.CharField(max_length=255, blank=True, default='')
    # )
    # if request.method == 'POST':
    #     serializer = SnippetSerializer(data=request.data)
    # if serializer.is_valid():
    #     serializer.save()
    #     return Response(serializer.data, status=status.HTTP_201_CREATED)
    # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    list_result = []
    for eachData in result:
        rDict = {}
        for eachField in Consultant._meta.get_fields():
            if eachData.get(eachField.name,"") == None:
                rDict[eachField.name] = ""
            else:
                rDict[eachField.name] = str(eachData.get(eachField.name,""))
        list_result.append(rDict)

    template = loader.get_template('index.html')
    context = {}
    columnData = []
    for i,eachField in enumerate(Consultant._meta.get_fields()):
        if i == 1 or i == 0:
            columnData.append({'field':eachField.name,"pinned":'left'})    
        columnData.append({'field':eachField.name})
    context["headers"] = columnData
    context["values"] = list_result
    context["userGroup"] = request.user.groups.values_list('name', flat=True)

    return HttpResponse(template.render(context, request))
