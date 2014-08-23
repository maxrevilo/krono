# Local settings for the project.
try:
    from settings_global import *
except ImportError as e:
    raise Exception('settings/common.py not available\n%s\n' % (str(e),))

DEBUG = True

#Don't use trailing slash!
BASE_URL = 'http://localhost'

ADMINS = (
    # ('Admin Name', 'admin@gmail.com'),
)


MEDIA_URL = '/media/'
STATIC_URL = '/static/'
MEDIA_ROOT = join(PROJECT_DIR, 'media')
STATIC_ROOT = join(PROJECT_DIR, 'static')

if DEBUG:
    STATICFILES_DIRS += (
        string.replace(join(PROJECT_DIR, 'frontend/dev/'), '\\', '/'),
    )
    CORS_URLS_REGEX = r'.*'

MANAGERS = ADMINS

ALLOWED_HOSTS = ['*']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'dev_db.sqlite',
        'ATOMIC_REQUESTS': True,
        'USER': '',
        'PASSWORD': '',
        'HOST': '',
        'PORT': '',
    }
}

# Make this unique, and don't share it with anybody.
SECRET_KEY = '^7s_9v^.%+;-%7___FAKE-KEY__~:%==v0~7:;Q59V!~C~^-0z'

if DEBUG:
    # Show emails in the console during development.
    EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
