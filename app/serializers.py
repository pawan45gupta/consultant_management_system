from rest_framework import serializers
from .models import Consultant

class ConsultantSerializer(serializers.ModelSerializer):
    class Meta:
        result = Consultant.objects.values()
        list_result = []
        columnData = []
        for i, eachField in enumerate(Consultant._meta.get_fields()):
            columnData.append(eachField.name)
        model = Consultant
        fields = columnData