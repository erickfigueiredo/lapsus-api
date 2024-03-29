
exports.seed = function (knex) {
  // Inserts seed entries
  return knex('etype_subloctype').insert([
    { loctype: 'COAST', subloctype: 'BNK', desc: 'Área entre Água e Terra' },
    { loctype: 'COAST', subloctype: 'CLF', desc: 'Penhasco' },
    { loctype: 'COAST', subloctype: 'CSTW', desc: 'Água Próximo a Costa' },
    { loctype: 'COAST', subloctype: 'EST', desc: 'Estuário' },
    { loctype: 'COAST', subloctype: 'FEN', desc: 'FEN ???' },
    { loctype: 'INW', subloctype: 'BOG', desc: 'Pântano' },
    { loctype: 'INW', subloctype: 'CAN', desc: 'Canal de Água' },
    { loctype: 'INW', subloctype: 'ICELK', desc: 'Lago Congelado' },
    { loctype: 'INW', subloctype: 'LKE', desc: 'Lago' },
    { loctype: 'INW', subloctype: 'RIV', desc: 'Rio' },
    { loctype: 'NAT', subloctype: 'CRP', desc: 'Colheita' },
    { loctype: 'NAT', subloctype: 'GRS', desc: 'Pastagem' },
    { loctype: 'NAT', subloctype: 'HFR', desc: 'Floresta Alta, com Árvores Acima de 20 Metros' },
    { loctype: 'NAT', subloctype: 'HLS', desc: 'Área Montanhosa com Acesso Rodoviário Limitado ???' },
    { loctype: 'NAT', subloctype: 'HMT', desc: 'Montanha Acima de Área Acessível por Veículo' },
    { loctype: 'NAT', subloctype: 'LMT', desc: 'Área Montanhosa com Acesso Rodoviário Limitado ???' },
    { loctype: 'NAT', subloctype: 'SSSI', desc: 'Locais de Interesse Científico' },
    { loctype: 'OSEA', subloctype: 'OFF', desc: 'Plataforma Marítma' },
    { loctype: 'OTH', subloctype: 'CUT', desc: '???' },
    { loctype: 'OTH', subloctype: 'ELV', desc: '???' },
    { loctype: 'OTH', subloctype: 'EMB', desc: '???' },
    { loctype: 'OTH', subloctype: 'LFR', desc: '???' },
    { loctype: 'OTH', subloctype: 'SRB', desc: '???' },
    { loctype: 'PRIVAT', subloctype: 'OWNRSC', desc: 'Local com Time de Resgate Próprio' },
    { loctype: 'RAIL', subloctype: 'TRK', desc: 'Ferrovia' },
    { loctype: 'ROAD', subloctype: '1RD', desc: 'Estrada de Mão Única' },
    { loctype: 'ROAD', subloctype: 'DCA', desc: 'Estrada de Mão Dúpla' },
    { loctype: 'ROAD', subloctype: 'NOR', desc: 'Área sem Estrada, Porém Acessível por Veículo' },
    { loctype: 'ROAD', subloctype: 'PTH', desc: 'Trilha' },
    { loctype: 'ROAD', subloctype: 'RRD', desc: 'Rua com Restrições (Peso, Altura)' },
    { loctype: 'ROAD', subloctype: 'SRD', desc: 'Via Lateral' },
    { loctype: 'ROAD', subloctype: 'TRK', desc: 'Pista' },
    { loctype: 'UDGN', subloctype: 'MIN', desc: 'Mina' },
    { loctype: 'UDGN', subloctype: 'TUN', desc: 'Túnel' },
    { loctype: 'UDGN', subloctype: 'UND', desc: 'Construção Subterrânea' },
    { loctype: 'URB', subloctype: 'ASR', desc: '???' },
    { loctype: 'URB', subloctype: 'HOSP', desc: 'Hospital' },
    { loctype: 'URB', subloctype: 'IND', desc: 'Área Industrial' },
    { loctype: 'URB', subloctype: 'MALL', desc: 'Shopping' },
    { loctype: 'URB', subloctype: 'OFF', desc: 'Escritório' },
    { loctype: 'URB', subloctype: 'PRK', desc: '???' },
    { loctype: 'URB', subloctype: 'RES', desc: 'Área Residencial' },
    { loctype: 'URB', subloctype: 'STRT', desc: 'Área Pública' }
  ]);
};
