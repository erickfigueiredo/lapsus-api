
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('contribution_legend').del()
    .then(function () {
      // Inserts seed entries
      return knex('contribution_legend').insert([
        { title: 'Aeroporto', uri: '/legend/airport_or_aircraft.png' },
        { title: 'Caminho de Estrada', uri: '/legend/way_in_or_entrance.png' },
        { title: 'Caminho de Saída', uri: '/legend/way_out_or_exit.png' },
        { title: 'Centro de Cuidados', uri: '/legend/health_care_centre_or_doctor.png' },
        { title: 'Cuidadora de Crianças', uri: '/legend/baby_care_or_nurse.png' },
        { title: 'Farmácia', uri: '/legend/pharmacy.png' },
        { title: 'Hospital', uri: '/legend/hospital.png' },
        { title: 'Hospital de Crianças', uri: '/legend/child_health_care_centre.png' },
        { title: 'Informações', uri: '/legend/information.png' },
        { title: 'Médico', uri: '/legend/doctor.png' },
        { title: 'Ponto de Evacuação', uri: '/legend/evacuation_assembly_point.png' },
        { title: 'Primeiros Socorros', uri: '/legend/first_aid.png' },
        { title: 'Refúgio Temporário de Evacuação', uri: '/legend/evacuation_temporary_refuge.png' },
        { title: 'Risco de Esmagamento', uri: '/legend/crushing_warning.png' },
        { title: 'Risco de Esmagamento de Mãos', uri: '/legend/crushing_of_hands_warning.png' },
        { title: 'Risco de Queda', uri: '/legend/drop_fall_warning.png' },
        { title: 'Sinal de Ação Geral de Obrigatória', uri: '/legend/general_mandatory_action_sign.png' },
        { title: 'Sinal Geral de Proibição', uri: '/legend/general_prohibitional_sign.png' },
        { title: 'Telefone', uri: '/legend/telephone.png' },
        { title: 'Telefone de Emergência', uri: '/legend/emergency_telephone.png' },
      ]);
    });
};
