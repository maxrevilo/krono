import random
import string
from django.db import models
from django.contrib.auth.models import User
from apps.base.models import BaseModel


class OrderManager(models.Manager):
    def create_order(self):
        N = 6
        order = self.create()
        order.number = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(N))
        return order


class Order(BaseModel):
    PENDING, READY, DELIVERED, CANCELED = range(4)
    STATUS_ENUM = (
        (PENDING, 'Pending'),
        (READY, 'Ready'),
        (DELIVERED, 'Delivered'),
        (CANCELED, 'Canceled')
    )

    #Esto es Autogenerado
    number = models.CharField(max_length=16, unique=True, default=None)
    status = models.CharField(max_length=1, choices=STATUS_ENUM, default=PENDING)

    #Object Manager
    objects = OrderManager()

    def __unicode__(self):
        return "P#%s" % (self.number)

    class Meta:
        verbose_name = 'Pedido'


class Message(BaseModel):
    user = models.ForeignKey(User, related_name="messages")
    order = models.ForeignKey(Order, related_name="messages")

    class Meta:
        verbose_name = 'Mensaje'


class AudioMessage(BaseModel):
    file = models.FileField(upload_to='%Y/%m/%d/messages/audio')


class TextMessage(BaseModel):
    text = models.TextField()
