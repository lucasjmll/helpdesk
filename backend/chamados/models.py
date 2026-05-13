# chamados/models.py

from django.db import models
from django.contrib.auth.models import AbstractUser


class Usuario(AbstractUser):

    matricula = models.CharField(
        max_length=20,
        unique=True
    )

    cpf = models.CharField(
        max_length=11,
        unique=True
    )

    is_admin = models.BooleanField(default=False)

    REQUIRED_FIELDS = ['cpf', 'matricula', 'email']

    def __str__(self):
        return self.username


class Local(models.Model):

    nome = models.CharField(max_length=255)

    def __str__(self):
        return self.nome


class Categoria(models.Model):

    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome


class Chamado(models.Model):

    STATUS_CHOICES = [
        ('aberto', 'Aberto'),
        ('resolvido', 'Resolvido'),
        ('fechado', 'Fechado'),
    ]

    usuario = models.ForeignKey(
        Usuario,
        on_delete=models.CASCADE,
        related_name='chamados'
    )

    categoria = models.ForeignKey(
        Categoria,
        on_delete=models.PROTECT
    )

    local = models.ForeignKey(
        Local,
        on_delete=models.PROTECT
    )

    descricao = models.TextField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='aberto'
    )

    ativo = models.BooleanField(default=True)

    criado_em = models.DateTimeField(auto_now_add=True)

    atualizado_em = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Chamado #{self.id}"


class AtualizacaoChamado(models.Model):

    chamado = models.ForeignKey(
        Chamado,
        on_delete=models.CASCADE,
        related_name='atualizacoes'
    )

    administrador = models.ForeignKey(
        Usuario,
        on_delete=models.CASCADE
    )

    status = models.CharField(max_length=20)

    observacao = models.TextField()

    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Atualização do chamado #{self.chamado.id}"