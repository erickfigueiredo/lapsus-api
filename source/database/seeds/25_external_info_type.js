
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('external_info_type').del()
    .then(function () {
      // Inserts seed entries
      return knex('external_info_type').insert([
        { type: 'MANUAL', desc: 'A URI Fornece Um Link Para Um Arquivo Em Um dos Formatos: PDF, Open Document ou RTF' },
        { type: 'MAP', desc: 'A URI Fornece Um Link Para Um Arquivo Que Contem Um Mapa Em Um dos Formatos: JPEG, PNG, PDF, TIFF ou GEOTIFF' },
        { type: 'OTHER', desc: 'A URI Fornece Um Link Para Um Tipo De Arquivo Não Padronizado, exemplo: DOCX' },
        { type: 'PHOTO', desc: 'A URI Fornece Um Link Para Um Arquivo Que Contém Uma Foto Em Um Dos Formatos: JPEG, PNG, PDF ou TIFF' },
        { type: 'WEBSIT', desc: 'A URI Fornece Um Link Para Uma Página da Web' }
      ]);
    });
};
