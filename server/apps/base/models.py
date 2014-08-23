from django.db import models


class BaseModel(models.Model):
    #Server data
    _updated_at = models.DateTimeField(auto_now=True, auto_now_add=True)
    _created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True
