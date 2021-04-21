const router = require('express').Router();

// -> Rotas de Login
const Login = require('../controllers/LoginController');

router.post('/login', Login.login);

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
const Technician = require('../controllers/TechnicianController');

router.get('/technician/all', Technician.index);
router.get('/technician/:id', Technician.show);
router.post('/technician', Technician.create);
router.put('/technician', Technician.update);
router.delete('/technician/:id', Technician.delete);

// -> Rotas de Institution
const Institution = require('../controllers/InstitutionController');

router.get('/institution/all', Institution.index);
router.get('/institution/:id', Institution.show);
router.post('/institution', Institution.create);
router.put('/institution', Institution.update);

// -> Rotas de Contact
const Contact = require('../controllers/ContactController');

router.get('/contact/all', Contact.index);
router.get('/contact/:id', Contact.show);
router.post('/contact', Contact.create);
router.patch('/contact/:id', Contact.toggleVisualize);
router.delete('/contact/:id', Contact.delete);

// -> Rotas de Shapefile
const Shapefile = require('../controllers/ShapefileController');

router.get('/shapefile/all', Shapefile.index);
router.get('/shapefile/:id', Shapefile.show);
router.post('/shapefile', Shapefile.create);
router.put('/shapefile', Shapefile.update);
router.delete('/shapefile/:id', Shapefile.delete);

// -> Rotas de ...

// -> Rotas de Erro 404
router.get('/ops', (req, res) => {
    res.status(404).send('ERRO 404 | A rota solicitada não existe!');
})

router.get('*', (req, res) => {
    res.redirect('/ops');
});

module.exports = router;
