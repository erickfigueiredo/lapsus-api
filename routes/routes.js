const router = require('express').Router();

// -> Rotas de Administrator
const Administrator = require('../controllers/AdminController');

router.get('/admin/all', Administrator.index);
router.get('/admin/:id', Administrator.show);
router.post('/admin', Administrator.create);
router.put('/admin', Administrator.update);
router.delete('/admin/:id', Administrator.delete);

// -> Rotas de Registered
const Registered = require('../controllers/RegisteredController');

router.get('/registered/all', Registered.index);
router.get('/registered/:id', Registered.show);
router.post('/registered', Registered.create);
router.put('/registered', Registered.update);
router.delete('/registered/:id', Registered.delete);

// -> Rotas de Technician


// -> Rotas de Erro 404

router.get('/ops', (req, res) => {
    res.status(404).send('ERRO 404 | A rota solicitada não existe!');
})

router.get('*', (req, res) => {
    res.redirect('/ops');
});

module.exports = router;
