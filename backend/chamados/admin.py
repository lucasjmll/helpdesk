from django.contrib import admin
from .models import *

admin.site.register(Usuario)
admin.site.register(Local)
admin.site.register(Categoria)
admin.site.register(Chamado)
admin.site.register(AtualizacaoChamado)