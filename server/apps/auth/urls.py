from django.conf.urls import patterns, url

from views import (
    login,
    auto_signup,
    # signup,
    logout,
    # reset_password,
    # change_password,
    # email_confirm
    )
#from django.views.decorators.csrf import csrf_exempt

# HTML Requests
urlpatterns = patterns('',
    url(r'^login/$', login, name='login'),

    # url(r'^signup/$', signup, name='signup'),
    url(r'^auto_signup/$', auto_signup, name='auto_signup'),

    url(r'^logout/$', logout, name='logout'),

    # url(r'^reset_password/$', reset_password, name='reset_password'),

    # url(r'^change_password/$', change_password, name='change_password'),

    # url(r'^confirm_email/$', email_confirm, name='email_confirm_reminder'),
)
