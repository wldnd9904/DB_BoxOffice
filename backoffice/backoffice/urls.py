"""backoffice URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.shortcuts import redirect
from django.conf.urls.static import static
from django.conf import settings

from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

import user_agents

schema_view = get_schema_view(
    openapi.Info(title="UOSCinema API",
                            default_version='v1',
                            description="API document for UOSCinema"),
    public=True,
    permission_classes=[permissions.AllowAny,],
)

def root_redirect(request):
    user_agent_string = request.META.get('HTTP_USER_AGENT', '')
    user_agent = user_agents.parse(user_agent_string)

    if user_agent.is_mobile:
        schema_view = 'cschema-redoc'
    else:
        schema_view = 'cschema-swagger-ui'
    
    return redirect(schema_view, permanent=True)

required_urlpatterns = [
    path('admin/', admin.site.urls),
]

urlpatterns = [
    re_path(r'^swagger(?P<format>.json|.yaml)$',
        schema_view.without_ui(cache_timeout=0),
        name='schema-json'),
    path('swagger/',
        schema_view.with_ui('swagger', cache_timeout=0),
        name='schema-swagger-ui'),
    path('redoc/',
        schema_view.with_ui('redoc', cache_timeout=0),
        name='schema-redoc'),
    path('redoc-old/',
        schema_view.with_ui('redoc-old', cache_timeout=0),
        name='schema-redoc-old'),
    re_path(r'^cached/swagger(?P<format>.json|.yaml)$',
        schema_view.without_ui(cache_timeout=None),
        name='cschema-json'),
    path('cached/swagger/',
        schema_view.with_ui('swagger', cache_timeout=None),
        name='cschema-swagger-ui'),
    path('cached/redoc/',
        schema_view.with_ui('redoc', cache_timeout=None),
        name='cschema-redoc'),
        path('',include('api.urls')),
] + required_urlpatterns + static(settings.STATIC_URL,
                                  document_root=settings.STATIC_ROOT)
