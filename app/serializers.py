from rest_framework import serializers
from .models import Consultant, CustomModel

class ConsultantSerializer(serializers.ModelSerializer):
    class Meta:
        result = Consultant.objects.values()
        list_result = []
        columnData = []
        for i, eachField in enumerate(Consultant._meta.get_fields()):
            columnData.append(eachField.name)
        model = Consultant
        fields = columnData

class CustomModelSerializer(serializers.ModelSerializer):
    class Meta:
        result = CustomModel.objects.values()
        list_result = []
        columnData = []
        for i, eachField in enumerate(CustomModel._meta.get_fields()):
            columnData.append(eachField.name)
        model = CustomModel
        fields = columnData
