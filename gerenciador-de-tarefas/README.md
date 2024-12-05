# Gestor de Tarefas

Bem-vindo ao **Gestor de Tarefas**, um aplicativo web desenvolvido para facilitar o gerenciamento de tarefas pessoais ou profissionais. O objetivo principal deste projeto é permitir a criação e organização de atividades em grupos distintos, tornando a gestão de tarefas mais eficiente e colaborativa.

## 📝 Descrição

O **Gestor de Tarefas** é um sistema de gerenciamento de atividades que permite aos usuários:

- Criar, visualizar, atualizar e excluir tarefas.
- Agrupar atividades por diferentes projetos.
- Acompanhar o status de cada projeto.
- Gerenciar múltiplos usuários com permissões específicas.
  
## 🚀 Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- **Next.js** – Framework para desenvolvimento web com React.
- **React** – Biblioteca JavaScript para criação de interfaces de usuário.
- **TypeScript** – Superset de JavaScript que adiciona tipagem estática.
- **Firebase Firestore** – Banco de dados em tempo real para armazenar as tarefas.
- **Firebase Authentication** – Sistema de autenticação para gerenciar usuários.

## ⚙️ Funcionalidades

1. **Autenticação de Usuários:**
   - Somente usuários autenticados podem criar, editar ou excluir tarefas.
   - Cada usuário só pode gerenciar as tarefas que ele criou.

2. **Gestão de Atividades por Projeto:**
   - Os usuários podem criar projetos e associar tarefas a eles.
   - As atividades são agrupadas por status, facilitando a organização.

3. **Atualização do Status das Tarefas:**
   - Os usuários podem atualizar o status de uma tarefa entre os seguintes estados: _Pendente_, _Em Andamento_ e _Concluído_.

## 🚀 Como Executar o Projeto

1. **Clone o repositório:**

```bash
git clone https://github.com/GabrielaZanetti/programacao-interface-usuario.git
```

2. **Instale as dependências:**

```bash
cd programacao-interface-usuario/gestor-de-tarefas
npm install
```

3. **Configure as variáveis de ambiente:**

Crie um arquivo `.env` com as seguintes variáveis:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=SEU_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=SEU_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=SEU_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=SEU_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=SEU_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=SEU_APP_ID
```

4. **Inicie o servidor de desenvolvimento:**

```bash
npm run dev
```

5. **Acesse o projeto:**

Abra [http://localhost:3000](http://localhost:3000) em seu navegador.

## 🛠️ Melhorias Futuras

- Implementação de notificações em tempo real para mudanças nas atividades.
- Adição de funcionalidades de arrastar e soltar para reorganização de tarefas.
- Integração com APIs externas para sincronização de dados.

---

Desenvolvido com ❤️ usando **Next.js**, **React** e **Firebase**.