# Local settings for the project.
try:
    from krono.settings.common import *
except ImportError as e:
    raise Exception('settings/common.py not available\n%s\n' % (str(e),))

from os import environ
import dj_database_url


#Don't use trailing slash!
BASE_URL = 'https://krono-market.herokuapp.com/'

ADMINS = (
    ('Krono', 'kronomarket@gmail.com'),
)

MIDDLEWARE_CLASSES += ('libs.middlewares.ssl_middleware.SSLMiddleware',)
INSTALLED_APPS += ('south',)

MEDIA_URL = 'media/'
STATIC_URL = 'static/'
MEDIA_ROOT = join(PROJECT_DIR, 'media')
STATIC_ROOT = join(PROJECT_DIR, 'static')

MANAGERS = ADMINS

DEBUG = environ.get('DJANGO_DEBUG', 'False') == 'True'
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True
CONN_MAX_AGE = 60

# Parse database configuration from $DATABASE_URL
DATABASES = {
    'default': dj_database_url.config()
}

# Honor the 'X-Forwarded-Proto' header for request.is_secure()
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# Allow all host headers
ALLOWED_HOSTS = ['*']

# Make this unique, and don't share it with anybody.
SECRET_KEY = environ['DJANGO_SECRET_KEY']

EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = "587"
EMAIL_HOST_USER = 'predictvia@<USER NAME>.com'
EMAIL_HOST_PASSWORD = '<your email password>'
EMAIL_USE_TLS = True
