# Lapsus API

LapsusVGI - API para Gerenciamento de informações de Desastres ligados à deslizamentos de terra.

> API desenvolvida por [Erick Figueiredo](https://github.com/erickfigueiredo) como parte da Iniciação Científica (IC) vinculada ao Departamento de Informática, com orientação do Prof. Jugurta Lisboa Filho, durante o curso de Graduação na Universidade Federal de Viçosa (UFV).

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

## Comandos básicos e Instalação ✔️

### Variáveis de Ambiente

Dentro da pasta source, complete as informações requisitadas nas variáveis de ambiente contidas no arquivo _.env_ de acordo com a explicação a seguir:

```
# -> Pode não ser necessário a depender do ambiente de implantação (nesse caso remova)
APP_PORT = "3001"

# -> Endereço do Frontend do sistema
APP_URL = "http://localhost:8080"

# -> Dados de acesso ao Banco de Dados
DB_TYPE = "pg"
DB_NAME = ""
DB_USER = ""
DB_PASS = ""
DB_HOST = ""
DB_PORT = "5433"

# -> Configurações de SMTP do e-mail do sistema
HOST_MAIL = ""
PORT_MAIL =  465
SYSTEM_MAIL = ""
PASS_MAIL = ""

# -> BCrypt
BCRYPT_SALT = 10

# -> Json Web Token, as duas variáveis SECRET abaixo buscam aumentar a segurança na comunicação, a partir de "senhas" (hashes), formas de gerá-las são exemplificadas abaixo (cada secret deve ter a sua própria)
JWT_TKN_ALGORITHM = "HS256"
JWT_TKN_SECRET = ""
JWT_TKN_RST_SECRET = ""

# -> Limite de número de anexos permitidos nas colaborações
ANNEX_QUANTITY = 3

# -> Limitador de Requisições (número de pedidos que um ip pode fazer por minuto)
RATE_MINUTE = 0.066
RATE_LIMIT = 60
```

### Formas de Gerar Hashes

Os exemplos demostrados a seguir são sugestões, fica a cargo do responsável escolher e estabelecer a melhor abordagem para seu cenário.

- Via Node.js: Tendo o Node.js instalado, com o terminal aberto execute o node e copie o seguinte comando para gerar um hash e cole o resultado sem aspas simples dentro da variável de ambiente.

```
crypto.randomBytes(64).toString("hex");
```

- Via OpenSSL: Tendo o OpenSSL instalado (vem instalado junto com o Git), com o terminal aberto na raiz do projeto copie o seguinte comando para gerar um hash, será criado um arquivo com o nome `openssl-secret.txt`, abra o arquivo copie o hash gerado, cole na variável de ambiente desejada e depois delete o arquivo.

```
openssl rand -out openssl-secret.txt -hex 64
```

**Importante**: A depender do ambiente onde será feita a implantação, o arquivo _.env_ dará lugar ao preenchimento das variáveis na própria plataforma onde o deploy será realizado, as informações a serem preenchidas serão as mesmas, porém podem requerer serem preenchidas de outra forma.

---

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

Cadastre um usuário como registrado no Banco de Dados e modifique o type de **R** para **A**, para que haja um Administrador no sistema.

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

- **200 OK**:
  Estas requisição foi bem sucedida. O significado do sucesso varia de acordo com o método HTTP:

- **201 Created**:
  A requisição foi bem sucedida e um novo recurso foi criado como resultado. Esta é uma tipica resposta enviada após uma requisição POST.

- **202 Accepted**:
  A requisição foi recebida mas nenhuma ação foi tomada sobre ela. Isto é uma requisição não-comprometedora, o que significa que não há nenhuma maneira no HTTP para enviar uma resposta assíncrona indicando o resultado do processamento da solicitação. Isto é indicado para casos onde outro processo ou servidor lida com a requisição, ou para processamento em lote.

- **203 Non-Authoritative Information**:
  Esse código de resposta significa que o conjunto de meta-informações retornadas não é o conjunto exato disponível no servidor de origem, mas coletado de uma cópia local ou de terceiros. Exceto essa condição, a resposta de 200 OK deve ser preferida em vez dessa resposta.

- **400 Bad Request**:
  Essa resposta significa que o servidor não entendeu a requisição pois está com uma sintaxe inválida.

- **401 Unauthorized**:
  Embora o padrão HTTP especifique "unauthorized", semanticamente, essa resposta significa "unauthenticated". Ou seja, o cliente deve se autenticar para obter a resposta solicitada.

- **403 Forbidden**:
  Embora o servidor tenha recebido e entendido a requisição o acesso foi negado.

- **404 Not Found**:
  O servidor não pode encontrar o recurso solicitado. Este código de resposta talvez seja o mais famoso devido à frequência com que acontece na web.

- **409 Conflict**:
  Esta resposta será enviada quando uma requisição conflitar com o estado atual do servidor.

- **500 Internal Server Error**:
  Esta resposta será enviada quando ocorrer um error não especificado no servidor.

---

**Documentação**: <https://documenter.getpostman.com/view/10158635/UyrADwTk>
