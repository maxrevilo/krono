from django.conf import settings
from django.conf.urls import patterns, include, url
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
    (r'^orders/', include('apps.orders.urls')),

    url(r'^admin/', include(admin.site.urls)),
)


if settings.DEBUG:
    urlpatterns += patterns('',
        url(r'^'+settings.MEDIA_URL+'(?P<path>.*)$', 'django.views.static.serve',
        {'document_root':
            settings.MEDIA_ROOT,
            'show_indexes': True}),
    )
