from django.conf.urls import patterns, url

from views import OrderView, OrderListView, OrderMessageListView

urlpatterns = patterns('',
    url(r'^$', OrderListView.as_view(), name='orders'),
    url(r'^(?P<id>\d*)$', OrderView.as_view(), name='orders'),

    url(r'^(?P<id>\d*)/messages$', OrderMessageListView.as_view(), name='order_messages'),
)
