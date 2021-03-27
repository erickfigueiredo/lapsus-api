const router = require('express').Router();

// -> Rotas de Registered
const Registered = require('../controllers/RegisteredController');

router.get('/registered/all', Registered.index);
router.get('/registered/:id', Registered.show);
router.post('/registered', Registered.create);
router.put('/registered', Registered.update);
router.delete('/registered/:id', Registered.delete);

// -> Rotas de ...

// -> Rotas de Erro 404

router.get('/ops', (req, res) => {
    res.status(404).send('ERRO 404 | A rota solicitada não existe!');
})

router.get('*', (req, res) => {
    res.redirect('/ops');
});

module.exports = router;
