const router = require('express').Router();

//const Auth = require('../middlewares/Auth');
const Administrator = require('../controllers/AdminController');
const Category = require('../controllers/CategoryController');
const Contact = require('../controllers/ContactController');
const Contribution = require('../controllers/ContributionController');
const Institution = require('../controllers/InstitutionController');
const Login = require('../controllers/LoginController');
const Registered = require('../controllers/RegisteredController');
const Shapefile = require('../controllers/ShapefileController');
const Technician = require('../controllers/TechnicianController');

// DEFINIÇÃO DE ROTAS

// -> Rotas de Administrator
router.get('/admin/all', Administrator.index);
router.get('/admin/:id', Administrator.show);
router.post('/admin', Administrator.create);
router.put('/admin', Administrator.update);
router.delete('/admin/:id', Administrator.delete);

// -> Rotas de Category
router.get('/category/all', Category.index);
router.get('/category/:id', Category.show);
router.post('/category', Category.create);
router.put('/category', Category.update);
router.delete('/category/:id', Category.delete);

// -> Rotas de Contact
router.get('/contact/all', Contact.index);
router.get('/contact/:id', Contact.show);
router.post('/contact', Contact.create);
router.get('/contact/toggle_check/:id', Contact.toggleVisualize);
router.delete('/contact/:id', Contact.delete);

// -> Rotas de Login
router.post('/login', Login.login);


// -> Rotas de Registered
router.get('/registered/all', Registered.index);
router.get('/registered/:id', Registered.show);
router.post('/registered', Registered.create);
router.put('/registered', Registered.update);
router.delete('/registered/:id', Registered.delete);

// -> Rotas de Technician
router.get('/technician/all', Technician.index);
router.get('/technician/:id', Technician.show);
router.post('/technician', Technician.create);
router.put('/technician', Technician.update);
router.delete('/technician/:id', Technician.delete);

// -> Rotas de Institution
router.get('/institution/all', Institution.index);
router.get('/institution/:id', Institution.show);
router.post('/institution', Institution.create);
router.put('/institution', Institution.update);


// -> Rotas de Shapefile
router.get('/shapefile/all', Shapefile.index);
router.get('/shapefile/:id', Shapefile.show);
router.post('/shapefile', Shapefile.create);
router.put('/shapefile', Shapefile.update);
router.delete('/shapefile/:id', Shapefile.delete);

// -> Rotas de Contribution
router.get('/contribution/all', Contribution.index);
router.get('/contribution/:id', Contribution.show);
router.post('/contribution', Contribution.create);
router.put('/contribution', Contribution.create);
router.delete('/contribution/:id', Contribution.delete);

// -> Rotas de Contribuição final

// -> Rotas de Backup

// -> Rotas de 

// -> Rotas de Erro 404
router.get('/ops', (req, res) => {
    res.status(404).send('ERRO 404 | A rota solicitada não existe!');
})

router.get('*', (req, res) => {
    res.redirect('/ops');
});

module.exports = router;