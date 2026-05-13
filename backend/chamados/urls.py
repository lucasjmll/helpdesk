from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter()

router.register(r'categorias', CategoriaViewSet)
router.register(r'locais', LocalViewSet)
router.register(r'chamados', ChamadoViewSet, basename='chamados')
router.register(
    r'atualizacoes',
    AtualizacaoChamadoViewSet,
    basename='atualizacoes'
)
router.register(
    r'usuarios',
    UsuarioViewSet,
    basename='usuarios'
)

urlpatterns = [

    path('', include(router.urls)),

    path(
        'me/',
        UsuarioMeView.as_view()
    ),

]