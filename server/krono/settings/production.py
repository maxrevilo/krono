# Local settings for the project.
try:
    from krono.settings.common import *
except ImportError as e:
    raise Exception('settings/common.py not available\n%s\n' % (str(e),))

from os import environ


#Don't use trailing slash!
BASE_URL = 'http://kronomarket.co'

ADMINS = (
    ('Oliver Perez', 'oliver.a.perez.c@gmail.com'),
)

INSTALLED_APPS += ('south',)

MEDIA_URL = 'media/'
STATIC_URL = 'static/'
MEDIA_ROOT = join(PROJECT_DIR, 'media')
STATIC_ROOT = join(PROJECT_DIR, 'static')

MANAGERS = ADMINS

DEBUG = False
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True
CONN_MAX_AGE = 60

ALLOWED_HOSTS = ['*']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'ATOMIC_REQUESTS': True,
        'NAME': 'predictvia-mm',
        'USER': environ['KRONO_DB_USER'],
        'PASSWORD': environ['KRONO_DB_PASSWORD'],
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}

# Make this unique, and don't share it with anybody.
SECRET_KEY = environ['DJANGO_SECRET_KEY']

EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = "587"
EMAIL_HOST_USER = 'predictvia@<USER NAME>.com'
EMAIL_HOST_PASSWORD = '<your email password>'
EMAIL_USE_TLS = True
