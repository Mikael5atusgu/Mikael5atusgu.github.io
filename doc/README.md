**Professor:** Carlos David.
---
**Integrantes:** Arthur Augusto de Souza, Alexsandro Oliveira Carvalho, Gabriel Carezolin Borges, Luis Fernando Ferreira Maracaipes Campos, Misael Augusto de Oliveira Gomes e Vitor Gabriel da Costa.
---

# HoraCerta --- Gestão Escolar e Calendário de Eventos

Sistema web desenvolvido para centralizar informações escolares,
organizar eventos do calendário e facilitar o gerenciamento de aulas,
provas, atividades e substituições.

## Sobre o projeto

O **HoraCerta** é uma aplicação web voltada para o ambiente escolar. A
proposta é reduzir a desorganização causada por alterações de horários,
aulas vagas e falta de comunicação sobre eventos acadêmicos.

O sistema utiliza uma arquitetura **full-stack**, com frontend em HTML5,
CSS3 e JavaScript Vanilla, backend em Node.js com Express e persistência
em PostgreSQL ou SQLite.

O projeto é dividido em três módulos principais:

- **M01 --- Interface Frontend**
- **M02 --- Servidor API Backend**
- **M03 --- Banco de Dados**

O escopo também contempla autenticação, calendário com filtros, gestão
de eventos e fluxo de solicitação e aprovação de substituições de aulas.

## Objetivos

- Centralizar informações acadêmicas em um único sistema.
- Permitir a visualização de eventos escolares em um calendário.
- Facilitar o cadastro e alteração de provas, trabalhos e aulas.
- Permitir solicitações de preenchimento de aulas vagas.
- Permitir que gestores aprovem ou recusem solicitações de
 substituição.
- Melhorar a comunicação sobre alterações de horários.
- Utilizar controle de acesso baseado em papéis (RBAC).

## Perfis de usuário

O sistema possui quatro perfis principais:

 -----------------------------------------------------------------------
 Perfil Principais funções
 ----------------------------------- -----------------------------------
 **Aluno** Visualizar calendário e enviar
 feedbacks ou relatos de problemas.

 **Professor** Visualizar eventos,
 cadastrar/alterar eventos de suas
 turmas e solicitar substituição de
 aulas vagas.

 **Gestor** Gerenciar eventos, aprovar ou
 recusar substituições e realizar
 bloqueios institucionais de
 horários.

 **Administrador** Possui acesso administrativo
 completo, incluindo gerenciamento,
 auditoria e configurações da
 plataforma.
 -----------------------------------------------------------------------

Também existem serviços auxiliares, como o **Banco de Dados** e o
**Serviço Notificador**, responsável por alertas e notificações.

## Principais funcionalidades

### Autenticação

- Login de usuários.
- Controle de acesso por perfil.
- Autenticação utilizando JWT.
- Proteção das rotas conforme as permissões do usuário.

### Calendário

- Visualização dos eventos escolares.
- Alternância entre visualização mensal e semanal.
- Filtros por categoria.
- Categorias como:
 - Aula
 - Prova/Trabalho
 - Feriado
 - Evento Escolar

### Gerenciamento de eventos

Professores, gestores e administradores podem cadastrar eventos
acadêmicos, informando:

- Título
- Disciplina
- Turma
- Tipo de evento
- Data
- Horário

### Substituição de aulas vagas

O sistema permite:

1. Identificar uma aula marcada como vaga.
2. Professor solicitar o preenchimento.
3. Gestor analisar a solicitação.
4. Aprovar ou recusar a substituição.
5. Atualizar o calendário após a decisão.
6. Notificar os usuários afetados.

### Bloqueio institucional

Gestores e administradores podem registrar bloqueios de horários
relacionados a atividades institucionais, como eventos em espaços da
escola.

### Feedback

Alunos podem enviar:

- Sugestões.
- Relatos de problemas relacionados aos horários.

### Exclusão segura

Eventos que exigem exclusão administrativa possuem confirmação em duas
etapas antes da remoção definitiva.

## Arquitetura

A arquitetura do HoraCerta é composta por:

``` text
Navegador Web
 │
 ▼
Frontend
HTML5 + CSS3 + JavaScript Vanilla
 │
 │ REST / JSON / Fetch
 ▼
Backend
Node.js + Express
 │
 │ SQL parametrizado
 ▼
Banco de Dados
PostgreSQL / SQLite
```

### Tecnologias

 Camada Tecnologia
 ----------------------- --------------------------------------
 Frontend HTML5, CSS3, JavaScript Vanilla ES6+
 Backend Node.js + Express
 Banco de dados PostgreSQL / SQLite
 Autenticação JWT
 Segurança de senha bcrypt ou Argon2id
 Sanitização express-validator / DOMPurify
 Modelagem UML 2.5.1
 Requisitos ISO/IEC/IEEE 29148:2018
 Requisitos de sistema FURPS+ / ISO/IEC 25010

## Estrutura do projeto

A estrutura prevista nos documentos é:

``` text
HoraCerta/
│
├── index.html
├── style.css
├── app.js
│
├── server.js
│
├── routes/
│ ├── auth.js
│ └── eventos.js
│
├── middlewares/
│ └── auth.js
│
├── schema.sql
└── database.js
```

Os arquivos estão organizados de acordo com os três módulos do projeto:

### M01 --- Frontend

- `index.html`
- `style.css`
- `app.js`

Responsável pela interface, calendário, filtros, temas e interação com o
usuário.

### M02 --- Backend

- `server.js`
- `routes/auth.js`
- `routes/eventos.js`
- `middlewares/auth.js`

Responsável pela API REST, autenticação, autorização e processamento das
operações.

### M03 --- Banco de Dados

- `schema.sql`
- `database.js`

Responsável pela persistência dos usuários, eventos, solicitações,
feedbacks e registros de auditoria.

## API REST

Principais rotas especificadas:

 -----------------------------------------------------------------------------
 Método Endpoint Acesso Função
 ----------------- ----------------------- ----------------- -----------------
 `POST` `/api/v1/auth/login` Público Autenticar
 usuário e gerar
 JWT

 `GET` `/api/v1/eventos` Público Listar eventos do
 calendário

 `POST` `/api/v1/eventos` Professor Cadastrar evento

 `DELETE` `/api/v1/eventos/:id` Gestor/Admin Remover evento

 `POST` `/api/v1/trocas` Professor Solicitar aula
 vaga

 `PATCH` `/api/v1/trocas/:id` Gestor Homologar
 substituição

 `POST` `/api/v1/feedbacks` Aluno Enviar feedback
 -----------------------------------------------------------------------------

## Segurança

O projeto define alguns requisitos de segurança:

- Senhas não devem ser armazenadas em texto plano.
- Utilização de **bcrypt** com fator de custo mínimo 12 ou
 **Argon2id**.
- Autenticação stateless utilizando **JWT**.
- Tokens com expiração máxima de 8 horas.
- Sanitização de dados recebidos pelo backend.
- Proteção contra **XSS**.
- Utilização de **Prepared Statements** para evitar SQL Injection.
- Controle de acesso baseado em papéis.
- Registro de ações administrativas na trilha de auditoria.

## Desempenho e confiabilidade

O sistema especifica:

- Operações de I/O assíncronas com `async/await`.
- Pool de conexões com limite de 5 a 20 conexões.
- Meta de resposta inferior a 100 ms para 95% das consultas de leitura
 de eventos.
- Uso de transações ACID em operações que alteram múltiplos registros.
- Trilha de auditoria para alterações realizadas por Gestores e
 Administradores.

## Principais tabelas

O banco de dados possui as seguintes estruturas principais:

``` text
perfis
 │
 ├── eventos
 │
 ├── solicitacoes_troca
 │
 ├── feedbacks
 │
 └── trilha_auditoria
```

### Tabelas

- `perfis` --- dados dos usuários e seus papéis.
- `eventos` --- aulas, provas, trabalhos, feriados e atividades.
- `solicitacoes_troca` --- solicitações de substituição de aulas.
- `feedbacks` --- sugestões e relatos enviados pelos alunos.
- `trilha_auditoria` --- histórico de ações administrativas.

## Requisitos funcionais principais

- **RSF-01:** Gerenciamento de autenticação e sessão.
- **RSF-02:** Consulta de eventos do calendário com filtros.
- **RSF-03:** Criação de evento acadêmico.
- **RSF-04:** Solicitação de preenchimento de aula vaga.
- **RSF-05:** Homologação de substituição de aula vaga.

## Requisitos de usuário

Entre os principais requisitos definidos estão:

- **RU-01:** Autenticação e seleção de perfil.
- **RU-02:** Visualização personalizada e filtragem do calendário.
- **RU-03:** Cadastro e edição de avaliações e trabalhos.
- **RU-04:** Solicitação de preenchimento de aula vaga.
- **RU-05:** Homologação e confirmação de substituição.
- **RU-06:** Bloqueio institucional de horário.
- **RU-07:** Envio de feedback e relato de problemas.
- **RU-08:** Exclusão segura de eventos.

## Documentação e modelagem

O projeto possui documentação baseada em:

- PMBOK 7ª Edição.
- UML 2.5.1.
- ISO/IEC/IEEE 29148:2018.
- FURPS+.
- ISO/IEC 25010.

Entre os artefatos previstos estão diagramas de:

- Casos de uso.
- Sequência.
- Classes.
- Componentes.
- Implantação.
- Contexto do sistema.

## Fora do escopo

O projeto não contempla:

- Aplicativo nativo para iOS ou Android.
- Integração com sistemas de folha de pagamento de professores.
- Processamento de pagamentos ou mensalidades.
- Transmissão de videoaulas ao vivo.

O foco do projeto é uma **aplicação web responsiva**.

## Desenvolvimento

A solução foi planejada para utilizar uma stack open-source e uma
arquitetura leve, evitando frameworks frontend pesados.

O desenvolvimento contempla três módulos:

``` text
1. Autenticação
2. Calendário e filtros
3. Gestão de trocas de aulas
```

O prazo definido no escopo é de **8 semanas** para conclusão e
implantação desses módulos.

## Documentação relacionada

Este README resume as especificações utilizadas no projeto:

- Especificação de Requisitos de Usuário (RU)
- Especificação de Requisitos de Sistema (RS)
- Especificação de Escopo e Governança de Projeto

------------------------------------------------------------------------

**HoraCerta --- Gestão Escolar e Calendário de Eventos**\
Versão 1.0 --- 08/09/2026
