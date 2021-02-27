# Lapsus VGI - API
LapsusVGI - API para Gerenciamento de informações de Desastres ligados à deslizamentos de terra.

---
### Boas práticas de desenvolvimento
- Instale módulos apenas quando necessário;
- Priorize o uso de aspas simples (exceto em JSON);
- Utilize ponto e vírgula (exceto em fechamento de chaves) para melhor entendimento do código e prevenção de erros;
- Modularize sempre que possível;
- Informações sensíveis como dados de acesso devem ficar armazenadas no arquivo;
- Padrão de nomenclatura:
    * camelCase para geral;
    * PascalCase para classes/funções que retornam classes;
- Uso de async/await (sempre que possível);
- Toda a regra de negócio deve ficar dentro dos controllers;
- Nomenclatura básica para Controladores:
    * Recuperar as tuplas de uma tabela: index;
    * Recuperar uma tupla de uma tabela: show;
    * Criar: create;
    * Atualizar: update;
    * Apagar: delete;
- Nomenclatura básica para Modelos: 
    * Recuperar um registro: findOne;
    * Recuperar todos os registros findAll.
### Comandos básicos (Dentro da pasta backend) ✔️

- npm start: Inicia a aplicação com nodemon;
- npm run migrate: Cria as tabelas no banco de dados;

### Funcionalidades prontas :dart:

- [ ] Adicionar



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

- __404 Not Found__: 
O servidor não pode encontrar o recurso solicitado. Este código de resposta talvez seja o mais famoso devido à frequência com que acontece na web.

- __409 Conflict__: 
Esta resposta será enviada quando uma requisição conflitar com o estado atual do servidor.
