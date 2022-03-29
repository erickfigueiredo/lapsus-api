# Lapsus API

LapsusVGI - API para Gerenciamento de informações de Desastres ligados à deslizamentos de terra.

> API desenvolvida por [Erick Figueiredo](https://github.com/erickfigueiredo) como parte da Iniciação Científica (IC) vinculada ao Departamento de Informática da Universidade Federal de Viçosa (UFV).

---

### Boas práticas de desenvolvimento

- Instale módulos apenas quando necessário;
- Priorize o uso de aspas simples (exceto em JSON);
- Utilize ponto e vírgula (exceto em fechamento de chaves) para melhor entendimento do código e prevenção de erros;
- Modularize sempre que possível;
- Informações sensíveis como dados de acesso devem ficar armazenadas no arquivo;
- Padrão de nomenclatura:
  - camelCase para geral;
  - PascalCase para classes/funções que retornam classes;
- Uso de async/await (sempre que possível);
- Toda a regra de negócio deve ficar dentro dos controllers;
- Nomenclatura básica para Controladores:
  - Recuperar as tuplas de uma tabela: index;
  - Recuperar uma tupla de uma tabela: show;
  - Criar: create;
  - Atualizar: update;
  - Apagar: delete;
- Nomenclatura básica para Modelos:
  - Recuperar um registro: findOne;
  - Recuperar todos os registros findAll.

---

### Comandos básicos e Instalação ✔️

Dentro da pasta source, complete as informações requisitadas nas variáveis de ambiente contidas no arquivo _.env_.
No arquivo _index.js_ contido na raiz do diretório source. Comente a linha abaixo e descomente a linha comentada e informe o endereço do frontend para que consiga consumir a API:

```
app.use(cors({ origin: true, credentials: true }));
//app.use(cors({ origin: 'http://localhost:8080' }));
```

Preenchidas as variáveis de ambiente, rode os comandos abaixo:

Para baixar as dependências (Inclusive de desenvolvimento):

```
npm install
```

Para baixar as dependências (Apenas de produção):

```
npm install --production
```

Para criar e popular o banco de dados inicialmente:

```
npm run migrate-and-sow
```

Iniciar o servidor:

```
npm start
```

Cadastre um usuário como registrado no Banco de Dados e modifique o type de __R__ para __A__, para que haja um Administrador no sistema.

---

### Funcionalidades e Camadas Extras 🎯

- [x] Envio de e-mails
- [x] Limitadores de Requisição
- [x] Middlewares
- [x] Migrations e Seeds
- [x] Validators
- [x] Rotas de consumo de recursos
- [x] Tarefas Agendadas
- [ ] ...

---

### Status de Requisição 💻

- __200 OK__:
  Estas requisição foi bem sucedida. O significado do sucesso varia de acordo com o método HTTP:

- __201 Created__:
  A requisição foi bem sucedida e um novo recurso foi criado como resultado. Esta é uma tipica resposta enviada após uma requisição POST.

- __202 Accepted__:
  A requisição foi recebida mas nenhuma ação foi tomada sobre ela. Isto é uma requisição não-comprometedora, o que significa que não há nenhuma maneira no HTTP para enviar uma resposta assíncrona indicando o resultado do processamento da solicitação. Isto é indicado para casos onde outro processo ou servidor lida com a requisição, ou para processamento em lote.

- __203 Non-Authoritative Information__:
  Esse código de resposta significa que o conjunto de meta-informações retornadas não é o conjunto exato disponível no servidor de origem, mas coletado de uma cópia local ou de terceiros. Exceto essa condição, a resposta de 200 OK deve ser preferida em vez dessa resposta.

- __400 Bad Request__:
  Essa resposta significa que o servidor não entendeu a requisição pois está com uma sintaxe inválida.

- __401 Unauthorized__:
  Embora o padrão HTTP especifique "unauthorized", semanticamente, essa resposta significa "unauthenticated". Ou seja, o cliente deve se autenticar para obter a resposta solicitada.

- __403 Forbidden__:
  Embora o servidor tenha recebido e entendido a requisição o acesso foi negado.

- __404 Not Found__:
  O servidor não pode encontrar o recurso solicitado. Este código de resposta talvez seja o mais famoso devido à frequência com que acontece na web.

- __409 Conflict__:
  Esta resposta será enviada quando uma requisição conflitar com o estado atual do servidor.

- __500 Internal Server Error__:
  Esta resposta será enviada quando ocorrer um error não especificado no servidor.
