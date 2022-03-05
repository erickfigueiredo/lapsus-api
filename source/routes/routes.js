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
router.get('/reset-password/check/:token', Access.checkToken);
router.post('/reset-password/token', Access.sendTokenResetPassword);
router.post('/reset-password', Access.resetPassword);

// -> Rotas de Usuário
router.get('/me', ensureAuthentication, User.show);
router.get('/user/type-relationship', ensureAuthentication, allowAdmin, User.userTypeRelationship);
router.get('/user/monthly', ensureAuthentication, allowAdmin, User.usersByMonth);
router.post('/user', User.create);
router.put('/user', ensureAuthentication, allowOwnUser, User.update);
router.patch('/user', ensureAuthentication, allowOwnUser, User.deactivate);

// -> Rotas de Administrator
router.get('/admin/:id', ensureAuthentication, allowAdmin, Administrator.show);
router.get('/admin', ensureAuthentication, allowAdmin, Administrator.index);
router.post('/admin', ensureAuthentication, allowAdmin, Administrator.create);

// -> Rotas de Registered
router.get('/registered/:id', ensureAuthentication, allowAdmin, Registered.show);
router.get('/registered', ensureAuthentication, allowAdmin, Registered.index);
router.post('/registered', ensureAuthentication, allowAdmin, Registered.create);
router.put('/registered', ensureAuthentication, allowAdmin, Registered.update);
router.patch('/registered', ensureAuthentication, allowAdmin, Registered.toggleStatus);

// -> Rotas de Moderator
router.get('/moderator/:id', ensureAuthentication, allowAdmin, Moderator.show);
router.get('/moderator', ensureAuthentication, allowAdmin, Moderator.index);
router.post('/moderator', ensureAuthentication, allowAdmin, Moderator.create);
router.put('/moderator', ensureAuthentication, allowAdmin, Moderator.update);
router.patch('/moderator', ensureAuthentication, allowAdmin, Moderator.toggleStatus);

// -> Rotas de Technician
router.get('/technician/institution/:id_institution',ensureAuthentication, allowAdmin, Technician.indexByInstitution);
router.get('/technician/:id', ensureAuthentication, allowAdmin, Technician.show);
router.get('/technician', ensureAuthentication, allowAdmin, Technician.index);
router.post('/technician', ensureAuthentication, allowAdmin, Technician.create);
router.put('/technician', ensureAuthentication, allowAdmin, Technician.update);
router.patch('/technician', ensureAuthentication, allowAdmin, Technician.toggleStatus);

// -> Rotas de Category
router.get('/category/detailed', ensureAuthentication, allowManager, Category.indexDetailed);
router.get('/category/amount', ensureAuthentication, allowManager, Category.getAmount);
router.get('/category/:id', ensureAuthentication, allowManager, Category.show);
router.get('/category', Category.index);
router.post('/category', ensureAuthentication, allowManager, Category.create);
router.put('/category', ensureAuthentication, allowManager, Category.update);
router.delete('/category/:id', ensureAuthentication, allowManager, Category.delete);

// -> Rotas de Contact
router.get('/contact/read-relationship', ensureAuthentication, allowManager, Contact.readRelationship);
router.get('/contact/:id', ensureAuthentication, allowManager, Contact.show);
router.get('/contact', ensureAuthentication, allowManager, Contact.index);
router.post('/contact', Contact.create);
router.patch('/contact/toggle-check', ensureAuthentication, allowManager, Contact.toggleVisualize);
router.delete('/contact/:id', ensureAuthentication, allowManager, Contact.delete);

// -> Rotas de Institution
router.get('/institution/detailed', ensureAuthentication, allowAdmin, Institution.indexDetailed);
router.get('/institution/amount', ensureAuthentication, allowManager, Institution.getAmount);
router.get('/institution/:id', ensureAuthentication, allowManager, Institution.show);
router.get('/institution', ensureAuthentication, allowAdmin, Institution.index);
router.post('/institution', ensureAuthentication, allowAdmin, Institution.create);
router.put('/institution', ensureAuthentication, allowAdmin, Institution.update);
router.delete('/institution/:id', ensureAuthentication, allowAdmin, Institution.delete);

// -> Rotas de Shapefile
router.get('/shapefile/amount', ensureAuthentication, allowManager, Shapefile.getAmount);
router.get('/shapefile/:id', Shapefile.show);
router.get('/shapefile', Shapefile.index);
router.post('/shapefile', ensureAuthentication, allowAdmin, Shapefile.create);
router.put('/shapefile', ensureAuthentication, allowAdmin, Shapefile.update);
router.delete('/shapefile/:id', ensureAuthentication, allowAdmin, Shapefile.delete);

// -> Rotas de Contribution
router.get('/contribution/publish-relationship/:id', ensureAuthentication, allowOwnUser, Contribution.publishRelationshipByUser);
router.get('/contribution/publish-relationship', ensureAuthentication, allowManagerAndModerator, Contribution.publishRelationship);
router.get('/contribution/detailed', Contribution.indexDetailed);
router.get('/contribution/:id', ensureAuthentication, allowManagerAndModerator, Contribution.show);
router.get('/contribution', ensureAuthentication, allowManagerAndModerator, Contribution.index);
router.post('/contribution', Contribution.create);
router.put('/contribution', ensureAuthentication, allowManagerAndModerator, Contribution.evaluateStatus);

// -> Rotas de Informações da organização
router.get('/organization', OrgInformation.show);
router.put('/organization', ensureAuthentication, allowAdmin, OrgInformation.update);

// -> Rota de Legenda dos Mapas
router.get('/map-legend', Legend.index);

// -> Rotas de Contatos de Emergência
router.get('/emergency-contact', EmergencyContact.index);
router.post('/emergency-contact', ensureAuthentication, allowAdmin, EmergencyContact.create);
router.put('/emergency-contact', ensureAuthentication, allowAdmin, EmergencyContact.update);
router.delete('/emergency-contact/:id', ensureAuthentication, allowAdmin, EmergencyContact.delete);

// -> Rotas de EMSI
router.get('/emsi/lists', ensureAuthentication, allowManager, EMSI.getFormLists);
router.get('/emsi/detailed', EMSI.indexDetailed);
router.post('/emsi', ensureAuthentication, allowManager, EMSI.create);

// -> Rotas de Erro 404
router.get('/ops', (_, res) => {
    res.status(404).send({ success: false, message: 'A rota solicitada não existe!' });
});

router.get('*', (_, res) => {
    res.redirect('/ops');
});

module.exports = router;
