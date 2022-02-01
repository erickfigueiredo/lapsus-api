require('dotenv').config();

const Message = require('./utils/Message');

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const router = require('./routes/routes');
const requestLimiter = require('./middlewares/Limiter');

app.use(cors({ origin: true, credentials: true }));
app.use(requestLimiter);
//app.use(cors({ origin: 'http://localhost:8080' }));

// Diretórios estáticos expostos
app.use('/legend', express.static('../upload/legend_items'));
app.use('/shapefiles', express.static('../upload/shapefiles'));
app.use('/annexes', express.static('../upload/annexes'))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

// Raiz usará o módulo router
app.use('/', router);

app.listen(process.env.APP_PORT, (error) => {
    Message.release('\nVersão: 0.0.1')
    Message.success(`\nServidor rodando na porta ${process.env.APP_PORT}\n`);
    if (error) Message.error('Servidor encerrado!\n');
});
