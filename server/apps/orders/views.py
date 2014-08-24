import json
from django.http import HttpResponse, HttpResponseBadRequest
from django.views.generic import View
from django.shortcuts import get_object_or_404
# from django.db import IntegrityError
from models import Order, Message, AudioMessage, TextMessage


class OrderListView(View):
    #@login_required
    def get(self, request, *args, **kwargs):
        orders = request.user.orders.all()
        response = map(lambda o: o.serialize(request.user), orders)

        return HttpResponse(json.dumps(response),
                            mimetype='application/json')

    def post(self, request, *args, **kwargs):
        print '+ + + + + + + + + '+str(request.POST)+' ---- '+str(request.FILES)
        order = Order.objects.create_order(user=request.user)
        order.save()
        if order.number is None:
            raise Exception("No se creo el numero :(")

        order.add_message(user=request.user, type=request.POST.get('type'), args=request.FILES)

        order = Order.objects.get(pk=order.pk)

        response = order.serialize(request.user)

        return HttpResponse(json.dumps(response),
                            mimetype='application/json')


class OrderView(View):
    #@login_required
    def get(self, request, *args, **kwargs):
        order = get_object_or_404(Order, id=kwargs['id'])

        response = order.serialize(request.user)

        return HttpResponse(json.dumps(response),
                            mimetype='application/json')

    #def put(self, request, *args, **kwargs):
    #def delete(self, request, *args, **kwargs):


class OrderMessageListView(View):
    #@login_required
    def get(self, request, *args, **kwargs):
        order = get_object_or_404(Order, id=kwargs['id'])
        if not request.user.is_staff or order.user != request.user:
            raise Exception("Not allowed")

        messages = order.messages.all()
        response = map(lambda m: m.serialize(request.user), messages)

        return HttpResponse(json.dumps(response),
                            mimetype='application/json')

    def post(self, request, *args, **kwargs):
        order = get_object_or_404(Order, id=kwargs['id'])
        if not request.user.is_staff or order.user != request.user:
            raise Exception("Not allowed")

        amsg = order.add_message(user=request.user, type=request.POST.get('type'), args=request.FILES)

        response = amsg.serialize(request.user)

        return HttpResponse(json.dumps(response),
                            mimetype='application/json')
