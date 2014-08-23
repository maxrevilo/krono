from django.contrib import admin
from apps.base.admin import BaseModelAdmin
from models import Order, Message, AudioMessage, TextMessage


class OrderAdmin(BaseModelAdmin):
    date_hierarchy = '_created_at'
    #number debe ser autogenerado y readonly

admin.site.register(Order, OrderAdmin)


class MessageAdmin(BaseModelAdmin):
    date_hierarchy = '_created_at'
    #No se deberian poder crear messages directamente, sino que se creen AudioMessages o TextMessages

admin.site.register(Message, MessageAdmin)


class TextMessageAdmin(BaseModelAdmin):
    date_hierarchy = '_created_at'
    #Un Text Message deberia crearse junto con su Message

admin.site.register(TextMessage, TextMessageAdmin)


class AudioMessageAdmin(BaseModelAdmin):
    date_hierarchy = '_created_at'
    #Un Text Message deberia crearse junto con su Message

admin.site.register(AudioMessage, AudioMessageAdmin)
