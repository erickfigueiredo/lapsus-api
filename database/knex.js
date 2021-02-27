const environment = process.env.NODE_ENV || 'development';
const config = require ('..knexfile')[enviroment];

const {attachPaginate} = require('knex-paginate');
attachPaginate();

module.exports = require('knex')(config);