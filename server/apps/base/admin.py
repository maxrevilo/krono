from django.contrib import admin


class BaseModelAdmin(admin.ModelAdmin):
    readonly_fields = ('_updated_at', '_created_at')
