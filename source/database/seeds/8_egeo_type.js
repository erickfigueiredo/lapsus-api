
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex.transaction(async trx => {
    await trx('egeo_subtype').del();
    await trx('egeo_type').del();
  }).then(function () {
    // Inserts seed entries
    return knex('egeo_type').insert([
      { type: 'AIR', desc: 'Área Aerea' },
      { type: 'CMB', desc: 'Área Relacionada a Combate' },
      { type: 'DGR', desc: 'Área Perigosa/Poluída' },
      { type: 'FLAME', desc: 'Área Área em Combustão' },
      { type: 'GEN', desc: 'Área de Propósito Geral' },
      { type: 'PLUME', desc: 'Pluma' },
      { type: 'SMOKE', desc: 'Fumaça' },
      { type: 'VULN', desc: 'Área Vulnerável' }
    ]);
  });
};
