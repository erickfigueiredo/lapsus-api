const router = require('express').Router();

const ensureAuthentication = require('../middlewares/Authentication');
const {
    allowOwnUser,
    allowAdmin,
    allowManager,
    allowManagerAndModerator
} = require('../middlewares/Authorization');

const Access = require('../controllers/AccessController');

const Administrator = require('../controllers/AdminController');
const Moderator = require('../controllers/ModeratorController');
const Registered = require('../controllers/RegisteredController');
const Technician = require('../controllers/TechnicianController');
const User = require('../controllers/UserController');

const Contribution = require('../controllers/ContributionController');
const EMSI = require('../controllers/EMSIController');
const Legend = require('../controllers/LegendController');

const Category = require('../controllers/CategoryController');
const Contact = require('../controllers/ContactController');
const EmergencyContact = require('../controllers/EmergencyContactController');
const Institution = require('../controllers/InstitutionController');
const Shapefile = require('../controllers/ShapefileController');
const OrgInformation = require('../controllers/OrgInformationController');



// -> Rotas de Access
router.post('/login', Access.login);

// -> Rotas de Usuário
router.get('/me', ensureAuthentication, User.show);
router.post('/user', User.create);
router.put('/user', ensureAuthentication, allowOwnUser, User.update);
router.patch('/user', ensureAuthentication, allowOwnUser, User.deactivate);

// -> Rotas de Administrator
router.get('/admin/all', ensureAuthentication, allowAdmin, Administrator.index);
router.get('/admin/:id', ensureAuthentication, allowAdmin, Administrator.show);
router.post('/admin', ensureAuthentication, allowAdmin, Administrator.create);

// -> Rotas de Registered
router.get('/registered/all', ensureAuthentication, allowAdmin, Registered.index);
router.get('/registered/:id', ensureAuthentication, allowAdmin, Registered.show);
router.post('/registered', ensureAuthentication, allowAdmin, Registered.create);
router.put('/registered', ensureAuthentication, allowAdmin, Registered.update);
router.patch('/registered', ensureAuthentication, allowAdmin, Registered.toggleStatus);

// -> Rotas de Moderator
router.get('/moderator/all', ensureAuthentication, allowAdmin, Moderator.index);
router.get('/moderator/:id', ensureAuthentication, allowAdmin, Moderator.show);
router.post('/moderator', ensureAuthentication, allowAdmin, Moderator.create);
router.put('/moderator', ensureAuthentication, allowAdmin, Moderator.update);
router.patch('/moderator', ensureAuthentication, allowAdmin, Moderator.toggleStatus);

// -> Rotas de Technician
router.get('/technician/institution/:id_institution',ensureAuthentication, allowAdmin, Technician.indexByInstitution);
router.get('/technician/all', ensureAuthentication, allowAdmin, Technician.index);
router.get('/technician/:id', ensureAuthentication, allowAdmin, Technician.show);
router.post('/technician', ensureAuthentication, allowAdmin, Technician.create);
router.put('/technician', ensureAuthentication, allowAdmin, Technician.update);
router.patch('/technician', ensureAuthentication, allowAdmin, Technician.toggleStatus);

// -> Rotas de Category
router.get('/category/all/detailed', ensureAuthentication, allowManager, Category.indexDetailed);
router.get('/category/all', Category.index);
router.get('/category/:id', ensureAuthentication, allowManager, Category.show);
router.post('/category', ensureAuthentication, allowManager, Category.create);
router.put('/category', ensureAuthentication, allowManager, Category.update);
router.delete('/category/:id', ensureAuthentication, allowManager, Category.delete);

// -> Rotas de Contact
router.get('/contact/all', ensureAuthentication, allowManager, Contact.index);
router.get('/contact/:id', ensureAuthentication, allowManager, Contact.show);
router.post('/contact', Contact.create);
router.patch('/contact/toggle_check', ensureAuthentication, allowManager, Contact.toggleVisualize);
router.delete('/contact/:id', ensureAuthentication, allowManager, Contact.delete);

// -> Rotas de Institution
router.get('/institution/all/detailed', ensureAuthentication, allowAdmin, Institution.indexDetailed);
router.get('/institution/all', ensureAuthentication, allowAdmin, Institution.index);
router.get('/institution/:id', ensureAuthentication, allowManager, Institution.show);
router.post('/institution', ensureAuthentication, allowAdmin, Institution.create);
router.put('/institution', ensureAuthentication, allowAdmin, Institution.update);
router.delete('/institution/:id', ensureAuthentication, allowAdmin, Institution.delete);

// -> Rotas de Shapefile
router.get('/shapefile/all', Shapefile.index);
router.get('/shapefile/:id', Shapefile.show);
router.post('/shapefile', ensureAuthentication, allowAdmin, Shapefile.create);
router.put('/shapefile', ensureAuthentication, allowAdmin, Shapefile.update);
router.delete('/shapefile/:id', ensureAuthentication, allowAdmin, Shapefile.delete);

// -> Rotas de Contribution
router.get('/contribution/all', ensureAuthentication, allowManagerAndModerator, Contribution.index);
router.get('/contribution/:id', ensureAuthentication, allowManagerAndModerator, Contribution.show);
router.post('/contribution', Contribution.create);
router.put('/contribution', ensureAuthentication, allowManagerAndModerator, Contribution.evaluateStatus);


// -> Rotas de Informações da organização
router.get('/organization', OrgInformation.show);
router.put('/organization', ensureAuthentication, allowAdmin, OrgInformation.update);

// -> Rota de Legenda dos Mapas
router.get('/map_legend', Legend.index);

// -> Rotas de Contatos de Emergência
router.get('/emergency_contact', EmergencyContact.index);
router.post('/emergency_contact', ensureAuthentication, allowAdmin, EmergencyContact.create);
router.put('/emergency_contact', ensureAuthentication, allowAdmin, EmergencyContact.update);
router.delete('/emergency_contact/:id', ensureAuthentication, allowAdmin, EmergencyContact.delete);

// -> Rotas de EMSI
router.get('/emsi/lists', ensureAuthentication, allowManager, EMSI.getFormLists);
router.post('/emsi', ensureAuthentication, allowManager, EMSI.create);

// -> Rotas de Estatística
/*
router.get('/statistics/user/type_relationship', ensureAuthentication, allowManager, Access.userTypeRelationship);
router.get('/statistics/user/monthly', ensureAuthentication, allowAdmin, Access.userByMonth);
router.get('/statistics/category/amount', ensureAuthentication, allowManager, Category.categoriesAmount);
router.get('/statistics/shapefile/amount', ensureAuthentication, allowAdmin, Shapefile.shapefilesAmount);
router.get('/statistics/institution/amount', ensureAuthentication, allowAdmin, Institution.instituionAmount);
router.get('/statistics/institution/user_amount', Institution);
router.get('/statistics/contact/read_relationship', Contact);
router.get('/statistics/contribution/publish_relationship', Contribution);
router.get('/statistics/contribution/', Contribution);
router.get('/statistics/contribution/', Contribution);
router.get('/statistics/emsi/', EMSI);
router.get('/statistics/emsi/', EMSI);*/

// -> Rotas de Erro 404
router.get('/ops', (_, res) => {
    res.status(404).send({ success: false, message: 'A rota solicitada não existe!' });
})

router.get('*', (_, res) => {
    res.redirect('/ops');
});

module.exports = router;