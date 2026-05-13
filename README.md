# 🛠️ HelpDesk - Sistema de Chamados

Sistema web de abertura e gerenciamento de chamados (tickets), com controle de usuários e painel administrativo.

---

## 🚀 Funcionalidades

### 👤 Usuário comum

* Login no sistema
* Criar chamados
* Visualizar seus chamados
* Ver detalhes e atualizações
* Excluir chamados (apenas se estiverem abertos)

### 👨‍💼 Administrador

* Visualizar todos os chamados
* Filtrar chamados por status
* Atualizar status dos chamados (aberto, resolvido, fechado)
* Adicionar observações
* Criar chamados
* Gerenciar:

  * Categorias
  * Locais
  * Usuários

---

## 🧱 Tecnologias utilizadas

### Backend

* Python
* Django
* Django Rest Framework (DRF)
* JWT Authentication

### Frontend

* React
* Vite
* Axios
* TailwindCSS

---

## 📁 Estrutura do Projeto

```
backend/
    chamados/
    usuarios/
    ...
frontend/
    src/
        pages/
        components/
```

---

## ⚙️ Como rodar o projeto

### 🔹 Backend (Django)

```bash
cd backend

# criar ambiente virtual (opcional, recomendado)
python -m venv venv

# ativar ambiente
# Linux/macOS:
source venv/bin/activate
# Windows:
venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate
python manage.py runserver
```

Servidor disponível em:
http://127.0.0.1:8000

---

### 🔹 Frontend (React)

```bash
cd frontend

npm install
npm run dev
```

Aplicação disponível em:
http://localhost:5173

---

## 🔐 Autenticação

O sistema utiliza **JWT (JSON Web Token)**.

Após login:

* O token é armazenado no `localStorage`
* Todas as requisições autenticadas utilizam:

```
Authorization: Bearer <token>
```

---

## 📌 Endpoints principais

### 🔑 Autenticação

* `POST /api/login/`

### 📄 Chamados

* `GET /api/chamados/`
* `POST /api/chamados/`
* `GET /api/chamados/{id}/`
* `POST /api/chamados/{id}/atualizar_status/`
* `DELETE /api/chamados/{id}/`

### ⚙️ Administração

* `GET/POST /api/categorias/`
* `GET/POST /api/locais/`
* `GET/POST /api/usuarios/`

---

## 🧠 Regras de negócio

* Usuários comuns só veem seus próprios chamados
* Administradores veem todos os chamados
* Apenas administradores podem:

  * Atualizar status
  * Criar atualizações
  * Gerenciar usuários, categorias e locais
* Chamados só podem ser excluídos se estiverem **abertos**

---

## 🎯 Status do projeto

✅ MVP funcional completo

🔧 Melhorias futuras:

* Melhor UX/UI
* Feedback visual (loading, alerts melhores)
* Edição de chamados
* Paginação e filtros avançados
* Deploy em produção
