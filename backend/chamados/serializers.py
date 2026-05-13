from rest_framework import serializers
from .models import *


class UsuarioSerializer(serializers.ModelSerializer):

    class Meta:
        model = Usuario
        fields = [
            'id',
            'username',
            'email',
            'cpf',
            'matricula',
            'is_admin'
        ]

class UsuarioMeSerializer(serializers.ModelSerializer):

    class Meta:

        model = Usuario

        fields = [
            'id',
            'username',
            'is_admin'
        ]

class LocalSerializer(serializers.ModelSerializer):

    class Meta:
        model = Local
        fields = '__all__'


class CategoriaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Categoria
        fields = '__all__'


class AtualizacaoChamadoSerializer(serializers.ModelSerializer):

    administrador_nome = serializers.CharField(
        source='administrador.username',
        read_only=True
    )

    class Meta:
        model = AtualizacaoChamado
        fields = '__all__'


class ChamadoSerializer(serializers.ModelSerializer):

    usuario_nome = serializers.CharField(
        source='usuario.username',
        read_only=True
    )

    categoria_nome = serializers.CharField(
    source='categoria.nome',
    read_only=True
    )

    local_nome = serializers.CharField(
        source='local.nome',
        read_only=True
    )

    atualizacoes = AtualizacaoChamadoSerializer(
        many=True,
        read_only=True
    )
    
    class Meta:
        model = Chamado
        fields = '__all__'
        read_only_fields = [
            'usuario',
            'status',
            'ativo'
        ]
    