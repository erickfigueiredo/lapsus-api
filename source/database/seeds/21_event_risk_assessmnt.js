
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('event_risk_assessmnt').del()
    .then(function () {
      // Inserts seed entries
      return knex('event_risk_assessmnt').insert([
        {risk_assessmnt: 'INCREA', desc: 'Aumentando'},
        {risk_assessmnt: 'DECREA', desc: 'Diminuindo'},
        {risk_assessmnt: 'STABLE', desc: 'Estável'}
      ]);
    });
};
