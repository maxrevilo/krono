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
        # user_liker = request.user
        # user_liked = get_object_or_404(User, id=kwargs['id'])

        # try:
        #     like = Like(
        #         liker     = user_liker,
        #         liked     = user_liked,
        #         anonymous = request.POST.get('anonym') == "true"
        #     )
        #     like.save()

        #     response = like.serialize(user_liker)

        #     #---------****---  PUSH  ---****---------#
        #     yg_pm = BarachielPushManager()
        #     yg_pm.set_like(like)
        #     yg_pm.send()

        #     return HttpResponse(json.dumps(response),
        #                         mimetype='application/json')

        # except IntegrityError:
        #     #TODO si ya existe pero con anonymous distinto actualizar.
        return HttpResponseBadRequest("Already Waved")


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

        tp = request.POST.get('type')

        if tp == "AUDIO":
            amsg = AudioMessage(file=request.FILES['file'], user=request.user, order=order)
            amsg.save()

            response = amsg.serialize(request.user)

            return HttpResponse(json.dumps(response),
                                mimetype='application/json')

        return HttpResponseBadRequest("Error with arguments")
