
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.transaction(async trx => {
    await trx('etype_subcategory').del();
    await trx('etype_category').del();
  }).then(function () {
      // Inserts seed entries
      return knex('etype_category').insert([
        {category: 'GND', desc: 'Evento Terrestre'}
      ]);
    });
};
