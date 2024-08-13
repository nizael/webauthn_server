
# Implementação de WebAuthn com Node.js, Express e bcrypt

## Visão Geral

Este projeto implementa WebAuthn, um método moderno e seguro de autenticação, utilizando Node.js, Express e bcrypt. O objetivo principal é fornecer um sistema de autenticação sem senha, mais seguro, que aumenta a segurança ao utilizar credenciais baseadas em hardware, como chaves de segurança, impressões digitais ou reconhecimento facial.

## Funcionalidades

- **Integração com WebAuthn**: Implementa a API WebAuthn para uma autenticação segura e sem senha.
- **bcrypt para Gestão de Senhas**: Armazenamento e gerenciamento de senhas de forma segura.
- **Express.js**: Framework de servidor leve e flexível.
- **TypeScript**: Desenvolvimento com tipagem estática para maior confiabilidade e manutenção.
- **Foco na Funcionalidade**: O projeto prioriza a implementação da funcionalidade de WebAuthn, sem se preocupar com uma arquitetura complexa.

## Como Começar

### Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado:

- **Node.js** (v14 ou superior)
- **npm** (v6 ou superior)

### Instalação

1. **Clone o Repositório**:
   ```bash
   git clone https://github.com/seunomeusuario/webauthn-server.git
   cd webauthn-server
   ```

2. **Instale as Dependências**:
   ```bash
   npm install
   ```

3. **Variáveis de Ambiente**:

   Crie um arquivo `.env` na raiz do diretório e adicione as seguintes variáveis:

   ```env
   PORT=3004
   ```

4. **Execute o Servidor**:
   ```bash
   npm run dev
   ```

   O servidor será iniciado em `http://localhost:3004`.

### Endpoints da API

- **`POST /generate-registration-options`**:
- **`POST /verify-registration`**:
- **`POST /verify-registration`**:

### Estrutura de Pastas

```
/src
  /user-case
   /index.ts
   /SessionController # Handlers para as rotas
  /routes
   /index.ts
   /sessionRouting    # Rotas da aplicação
  /app/index.ts       # Ponto de entrada do servidor
```

### Tecnologias Utilizadas

- **Node.js**: Runtime JavaScript para construir aplicações no lado do servidor.
- **Express.js**: Framework de aplicação web minimalista e flexível para Node.js.
- **bcrypt**: Biblioteca para hash de senhas de forma segura.
- **TypeScript**: Superset de JavaScript com tipos estáticos.

## Contribuição

Se você deseja contribuir para este projeto, por favor, faça um fork do repositório e utilize um branch para suas alterações. Pull requests são muito bem-vindos.


## Agradecimentos

- Agradecimentos aos criadores do Node.js, Express e bcrypt por suas ferramentas incríveis.
