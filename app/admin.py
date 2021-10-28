from django.contrib import admin

from import_export import resources
from app.models import Consultant, CustomModel
from import_export.admin import ImportExportModelAdmin


class ConsultantResource(resources.ModelResource):
    class Meta:
        model = Consultant


class BookAdmin(ImportExportModelAdmin):
    resource_class = ConsultantResource

    list_display = [field.name for field in Consultant._meta.get_fields()]
    search_fields = [field.name for field in Consultant._meta.get_fields()]


admin.site.register(Consultant, BookAdmin)
admin.site.register(CustomModel)