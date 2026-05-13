from rest_framework.decorators import action
from rest_framework import status
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .models import *
from .serializers import *
from .permissions import IsAdminUsuario


class CategoriaViewSet(viewsets.ModelViewSet):

    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer


class LocalViewSet(viewsets.ModelViewSet):

    queryset = Local.objects.all()
    serializer_class = LocalSerializer


class ChamadoViewSet(viewsets.ModelViewSet):

    serializer_class = ChamadoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        user = self.request.user

        # Admin vê todos
        if user.is_admin:
            return Chamado.objects.filter(
                ativo=True
            ).order_by('-criado_em')

        # Usuário vê apenas os próprios
        return Chamado.objects.filter(
            usuario=user,
            ativo=True
        ).order_by('-criado_em')

    def perform_create(self, serializer):

        serializer.save(
            usuario=self.request.user
        )

    def destroy(self, request, *args, **kwargs):

        chamado = self.get_object()

        # só pode apagar se estiver aberto
        if chamado.status != 'aberto':
            return Response(
                {'erro': 'Somente chamados abertos podem ser apagados.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # somente dono ou admin
        if chamado.usuario != request.user and not request.user.is_admin:
            return Response(
                {'erro': 'Sem permissão.'},
                status=status.HTTP_403_FORBIDDEN
            )

        chamado.ativo = False
        chamado.save()

        return Response(
            {'mensagem': 'Chamado apagado com sucesso.'},
            status=status.HTTP_200_OK
        )

    @action(detail=True, methods=['post'])
    def atualizar_status(self, request, pk=None):

        print(request.user)
        print(request.user.is_admin)
        
        chamado = self.get_object()

        if not request.user.is_admin:

            return Response(
                {'erro': 'Sem permissão'},
                status=status.HTTP_403_FORBIDDEN
            )

        novo_status = request.data.get('status')
        observacao = request.data.get('observacao')

        chamado.status = novo_status
        chamado.save()

        AtualizacaoChamado.objects.create(
            chamado=chamado,
            administrador=request.user,
            observacao=observacao
        )

        serializer = self.get_serializer(chamado)

        return Response(serializer.data)

class AtualizacaoChamadoViewSet(viewsets.ModelViewSet):

    serializer_class = AtualizacaoChamadoSerializer
    permission_classes = [IsAuthenticated, IsAdminUsuario]

    queryset = AtualizacaoChamado.objects.all()

    def perform_create(self, serializer):

        atualizacao = serializer.save(
            administrador=self.request.user
        )

        # atualiza status do chamado
        chamado = atualizacao.chamado
        chamado.status = atualizacao.status
        chamado.save()

class UsuarioMeView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        serializer = UsuarioMeSerializer(request.user)

        return Response(serializer.data)
    
class UsuarioViewSet(viewsets.ModelViewSet):

    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [IsAuthenticated, IsAdminUsuario]

    def create(self, request, *args, **kwargs):

        data = request.data.copy()

        password = data.get('password')

        user = Usuario(
            username=data.get('username'),
            email=data.get('email'),
            cpf=data.get('cpf'),
            matricula=data.get('matricula'),
            is_admin=data.get('is_admin', False)
        )

        user.set_password(password)

        user.save()

        serializer = self.get_serializer(user)

        return Response(serializer.data)