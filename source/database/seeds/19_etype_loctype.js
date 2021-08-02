
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.transaction(async trx => {
    await trx('etype_subloctype').del();
    await trx('etype_loctype').del();
  }).then(function () {
      // Inserts seed entries
      return knex('etype_loctype').insert([
        {loctype: 'COAST', desc: 'Área Costal'},
        {loctype: 'INW', desc: 'Corpo de Água'},
        {loctype: 'NAT', desc: 'Ambiente Natural/Rural'},
        {loctype: 'OSEA', desc: 'Mar Aberto'},
        {loctype: 'OTH', desc: 'Outro'},
        {loctype: 'PRIVAT', desc: 'Privado'},
        {loctype: 'RAIL', desc: 'Trilhos Ferroviários'},
        {loctype: 'ROAD', desc: 'Estradas'},
        {loctype: 'UDGN', desc: 'Local Subterrâneo'},
        {loctype: 'URB', desc: 'Área Urbana'}
      ]);
    });
};
