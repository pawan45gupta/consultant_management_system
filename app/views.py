from django.template import loader
from app.models import Consultant
from django.http import HttpResponse
from django.db import models
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
# from snippets.models import Snippet
# from snippets.serializers import SnippetSerializer

# def add_field(sender, **kwargs):
#     """
#     class_prepared signal handler that checks for the model named
#     MyModel as the sender, and adds a CharField
#     to it.
#     """
#     if sender.__name__ == "MyModel":
#         field = models.CharField("New field", max_length=100)
#         field.contribute_to_class(sender, "new_field")
#
# Consultant.connect(add_field)

# @api_view(['GET', 'POST'])
def index(request):
    result = Consultant.objects.values()
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

    return HttpResponse(template.render(context, request))
