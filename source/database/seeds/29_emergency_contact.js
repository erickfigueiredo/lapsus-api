
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('emergency_contact').del()
    .then(function () {
      // Inserts seed entries
      return knex('emergency_contact').insert([
        {name: 'Corpo de Bombeiros', phone: '193'},
        {name: 'Defesa Civil', phone: '199'},
        {name: 'Disque Denúncia', phone: '181'},
        {name: 'Polícia Civil', phone: '197'},
        {name: 'Polícia Militar', phone: '190'},
        {name: 'SAMU', phone: '192'},
      ]);
    });
};
