# Fincheck

<!---Esses são exemplos. Veja https://shields.io para outras pessoas ou para personalizar este conjunto de escudos. Você pode querer incluir dependências, status do projeto e informações de licença aqui--->

![GitHub repo size](https://img.shields.io/github/repo-size/elvesbd/fincheck?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/elvesbd/fincheck?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/elvesbd/fincheck?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues-raw/elvesbd/fincheck?style=for-the-badge)
![GitHub pull requests](https://img.shields.io/github/issues-pr/elvesbd/fincheck?style=for-the-badge)

<img src="https://i.imgur.com/He7RgjD.png" alt="exemplo imagem">

> A API de Controle de Finanças fincheck foi desenvolvida internamente para os alunos do curso [JStack](https://jstack.com.br) ministrado por [Mateus Silva](https://github.com/maateusilva) é uma plataforma abrangente projetada para ajudar os usuários a gerenciar suas finanças de forma eficiente. Com esta API, você pode se cadastrar como usuário, cadastrar contas financeiras e criar transações de gastos e depósitos. O processo de cadastro na API é simples e seguro. Após se registrar, você receberá um token de acesso exclusivo, que será necessário para autenticar suas solicitações e obter acesso às funcionalidades disponíveis. No curso foi feito a criação da API, mas procurei andar a milha extra e aplicar alguns conhecimento que tenho adquirido no mercado como [ports and adapters](https://www.youtube.com/watch?v=7SaA3HCOc4c), princípios do [SOLID](https://www.youtube.com/watch?v=mkx0CdWiPRA) e aplicação de tests unitários com [jest](https://jestjs.io/).

### Ajustes e melhorias

O projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas nas seguintes tarefas:

- [x] Refatorar auth module
- [ ] Refatorar bank accounts module
- [ ] Refatorar transactions module
- [ ] Adicionar teste unitários

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

<!---Estes são apenas requisitos de exemplo. Adicionar, duplicar ou remover conforme necessário--->

- Você precisa ter o [node](https://nodejs.org/en) instalado
- [docker](https://docs.docker.com/engine/install) para rodar o banco de dados, na aplicação utilizamos Postgres.

## 🚀 Instalando fincheck

Para instalar o fincheck, siga estas etapas:

Clone o projeto:

```
git clone https://github.com/elvesbd/fincheck.git
```

Acesse o diretório da api:

```
cd fincheck/api
```

Instale as dependências:

```
yarn install
```

Rodando postgres com docker:

```
docker run --name <nome_container> -e POSTGRES_USER=<sua senha> -e POSTGRES_PASSWORD=<seu password> -p 5432:5432 -d postgres
```

Verifique se o container estar rodando:

```
docker ps
```

Acessando o container para criar a base de dados:

```
docker exec -it <nome_container> bash
```

Acessando o banco de dados postgres:

```
psql -U <sua senha>
```

Criando a base de dados:

```
CREATE DATABASE <defina o nome da sua base aqui>;
execute o comando \l para verificar se sua base foi criada
```

Altere no .env a variável de ambiente de acesso ao banco:

```
DATABASE_URL="postgresql://<sua usuario>:<sua senha>@localhost:5432/<nome da base de dados>?schema=public"
```

Execute as migrations:

```
yarn prisma migrate dev
```

Defina um valor para sua jwt secret:

```
JWT_SECRET=valor
```

## ☕ Usando fincheck

Para usar fincheck, execute:

```
yarn start:dev
```

Para acessar a api do fincheck:

```
http://localhost:<porta>/api/v1
```

## 📫 Contribuindo para fincheck

<!---Se o seu README for longo ou se você tiver algum processo ou etapas específicas que deseja que os contribuidores sigam, considere a criação de um arquivo CONTRIBUTING.md separado--->

Para contribuir com fincheck, siga estas etapas:

1. Bifurque este repositório.
2. Crie um branch: `git checkout -b <nome_branch>`.
3. Faça suas alterações e confirme-as: `git commit -m '<mensagem_commit>'`
4. Envie para o branch original: `git push origin <fincheck> / <local>`
5. Crie a solicitação de pull.

Como alternativa, consulte a documentação do GitHub em [como criar uma solicitação pull](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## 🤝 Colaboradores

Agradecemos às seguintes pessoas que contribuíram para este projeto:

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://github.com/elvesbd.png" width="100px;" alt="Foto do Iuri Silva no GitHub"/><br>
        <sub>
          <b>Elves Brito</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE.md) para mais detalhes.

[⬆ Voltar ao topo](#Fincheck)<br>
