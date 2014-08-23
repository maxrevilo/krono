# Global settings for the project.
from os.path import join, abspath, dirname
import string

PROJECT_DIR = abspath(join(dirname(__file__), '../../'))

# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
TIME_ZONE = 'UTC'

# http://www.i18nguy.com/unicode/language-identifiers.html
LANGUAGE_CODE = 'en-us'

SITE_ID = 1
SITE_NAME = "Krono Market"

USE_I18N = False
USE_L10N = False
USE_TZ = False

APPEND_SLASH = False

STATICFILES_DIRS = (
    string.replace(join(PROJECT_DIR, 'frontend/dist/'), '\\', '/'),
)

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
)

TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
)
TEMPLATE_DIRS = (
    join(PROJECT_DIR, 'templates'),
)
TEMPLATE_CONTEXT_PROCESSORS = (
    # Django Processors:
    'django.core.context_processors.debug',
    'django.core.context_processors.i18n',
    'django.core.context_processors.media',
    'django.core.context_processors.static',
    'django.core.context_processors.tz',
    'django.core.context_processors.request',
    'django.contrib.auth.context_processors.auth',
    'django.contrib.messages.context_processors.messages',
    #Project Processors
    # "apps.html.context_processors.html_processor"
)

MIDDLEWARE_CLASSES = (
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'krono.urls'
CORS_ORIGIN_ALLOW_ALL = True
CORS_URLS_REGEX = r'^/api/.*$'
CORS_ALLOW_CREDENTIALS = False  # Cookies not alloew over CORS

# Python dotted path to the WSGI application used by Django's runserver.
WSGI_APPLICATION = 'krono.wsgi.application'

#AUTHENTICATION_BACKENDS = (
    #'auth.backends.AuthBackend',
#)
AUTH_PROFILE_MODULE = 'apps.customer.Customer'

SESSION_COOKIE_AGE = 2419200
#CSRF_FAILURE_VIEW = 'apps.auth.views.csrf_failure'

FIXTURE_DIRS = (
    join(PROJECT_DIR, 'fixtures'),
)

INSTALLED_APPS = (
# Django Apps:
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.messages',
    'django.contrib.sessions',
    'django.contrib.staticfiles',
# Barachiel Apps:
    'apps.base',
    'apps.orders',
    # 'apps.html',
    # 'apps.auth',
# 3rd Party Apps:
    'rest_framework',
    'corsheaders',
)

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny',
    ),
    'PAGINATE_BY': 10,
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
    )
}

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        }
    },
    'handlers': {
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        }
    },
    'loggers': {
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': True,
        },
    }
}
