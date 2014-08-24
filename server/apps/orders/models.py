import random
import string
from django.db import models
from django.contrib.auth.models import User
from apps.base.models import BaseModel


class OrderManager(models.Manager):
    def create_order(self, user):
        N = 6
        number = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(N))
        order = self.create(user=user, number=number)
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
    user = models.ForeignKey(User, related_name="orders")
    number = models.CharField(max_length=16, unique=True, default=None)
    status = models.IntegerField(max_length=1, choices=STATUS_ENUM, default=PENDING)

    #Object Manager
    objects = OrderManager()

    def add_message(self, user, type, args):
        if type == "AUDIO":
            amsg = AudioMessage(file=args['file'], user=user, order=self)
            amsg.save()
            return amsg
        else:
            raise Exception("Type not suppoted")

    def serialize(self, user):
        msg_srl = lambda msg: msg.audiomessage if hasattr(msg, 'audiomessage') else (msg.textmessage if hasattr(msg, 'textmessage') else msg)

        result = {
            'number': self.number,
            'user_id': self.user.id,
            'status': self.id,
            'messages':  map(lambda m: msg_srl(m).serialize(user), self.messages.all()),
            '_created_at': self._created_at.isoformat(),
        }
        return result

    def __unicode__(self):
        return "P#%s" % (self.number)

    class Meta:
        verbose_name = 'Pedido'


class Message(BaseModel):
    user = models.ForeignKey(User, related_name="messages")
    order = models.ForeignKey(Order, related_name="messages")

    def serialize(self, user):
        result = {
            'order_number': self.order.number,
            'user_id': self.user.id,
            '_created_at': self._created_at.isoformat(),
        }
        return result

    class Meta:
        verbose_name = 'Mensaje'


class AudioMessage(Message):
    file = models.FileField(upload_to='%Y/%m/%d/messages/audio')

    def serialize(self, user):
        result = super(AudioMessage, self).serialize(user)
        result['file'] = self.file.url

        return result


class TextMessage(Message):
    text = models.TextField()

    def serialize(self, user):
        result = super(TextMessage, self).serialize(user)
        result['text'] = self.text

        return result
