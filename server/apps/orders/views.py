import json
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseForbidden
from django.db import IntegrityError
from django.views.generic import View
from django.shortcuts import get_object_or_404
# from django.db import IntegrityError
from models import Order, Message, AudioMessage, TextMessage
from libs.helpers.put import PUT


class OrderListView(View):
    #@login_required
    def get(self, request, *args, **kwargs):
        orders = request.user.orders.all()  # TODO FILTRAR LAS CANCELADAS O LISTAS
        response = map(lambda o: o.serialize(request.user), orders)

        return HttpResponse(json.dumps(response),
                            mimetype='application/json')

    def post(self, request, *args, **kwargs):
        order = Order.objects.create_order(user=request.user)
        order.save()
        if order.number is None:
            raise Exception("No se creo el numero :(")

        try:
            order.add_message(user=request.user, type=request.POST.get('type'), args=request.FILES)
        except Exception as e:
            return HttpResponseBadRequest(e.message)
        else:

            order = Order.objects.get(pk=order.pk)
            response = order.serialize(request.user)
            return HttpResponse(json.dumps(response),
                            mimetype='application/json')


class OrderView(View):
    #@login_required
    def get(self, request, *args, **kwargs):
        order = get_object_or_404(Order, id=kwargs['id'])

        if not request.user.is_staff or request.user != order.user:
                return HttpResponseForbidden()

        response = order.serialize(request.user)

        return HttpResponse(json.dumps(response),
                            mimetype='application/json')

    def put(self, request, *args, **kwargs):
        order = get_object_or_404(Order, id=kwargs['id'])
        status = int(PUT(request, 'status'))

        is_staff = request.user.is_staff
        is_orderer = request.user == order.user

        #Security checks
        if status in (Order.DELIVERED, Order.CANCELED):
            if not is_staff:
                return HttpResponseForbidden()
        elif status in (Order.READY, Order.CANCELED):
            if not is_orderer:
                return HttpResponseForbidden()
        else:
            return HttpResponseForbidden()

        try:
            order.status = status
            order.save()
        except IntegrityError as e:
            return HttpResponseBadRequest(e.message)
        else:
            response = order.serialize(request.user)
            return HttpResponse(json.dumps(response),
                                mimetype='application/json')

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

        try:
            amsg = order.add_message(user=request.user, type=request.POST.get('type'), args=request.FILES)
        except Exception as e:
            return HttpResponseBadRequest(e.message)
        else:

            response = amsg.serialize(request.user)
            return HttpResponse(json.dumps(response),
                                mimetype='application/json')
