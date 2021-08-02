
exports.seed = function (knex) {
  // Inserts seed entries
  return knex('etype_subcategory').insert([
    { category: 'GND', subcategory: 'LDS', desc: 'Deslizamento de Terra' }
  ]);

};
