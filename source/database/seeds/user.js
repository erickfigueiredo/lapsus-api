
//Fazer um hash de senha



exports.seed = function(knex) {
  return knex('user').del()
    .then(function () {
      return knex('user').insert([
        {name: 'Nome', surname: 'Sobrenome', email: 'exemplo@email.com', password: 'abc123', type: 'A'}
      ]);
    });
};
