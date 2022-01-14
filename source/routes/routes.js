const router = require('express').Router();

const { ensureAuthentication } = require('../middlewares/Authentication');
const {
    allowOwnUser,
    allowAdmin,
    allowTechnician,
    allowManager,
    allowRegisteredAndModerator,
    allowManagerAndModerator
} = require('../middlewares/Authorization');

const Administrator = require('../controllers/AdminController');
const Category = require('../controllers/CategoryController');
const Contact = require('../controllers/ContactController');
const Contribution = require('../controllers/ContributionController');
const Institution = require('../controllers/InstitutionController');
const Access = require('../controllers/AccessController');
const Moderator = require('../controllers/ModeratorController');
const Registered = require('../controllers/RegisteredController');
const Shapefile = require('../controllers/ShapefileController');
const Technician = require('../controllers/TechnicianController');
const OrgInformation = require('../controllers/OrgInformationController');
const EmergencyContact = require('../controllers/EmergencyContactController');
const Legend = require('../controllers/LegendController');

const EMSI = require('../controllers/EMSIController');

// -> Rotas de Access
router.get('/me', ensureAuthentication, Access.getUserInfo);
router.post('/login', Access.login);

// -> Rotas de Administrator
router.get('/admin/all', Administrator.index);
router.get('/admin/:id', Administrator.show);
router.post('/admin', Administrator.create);
router.put('/admin', Administrator.update);
router.delete('/admin/:id', Administrator.deactivate);

// -> Rotas de Category -> OKAY
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

// -> Rotas de Registered
router.get('/registered/all', Registered.index);
router.get('/registered/:id', Registered.show);
router.post('/registered', Registered.create);
router.put('/registered', Registered.update);
router.delete('/registered/:id', Registered.deactivate);

// -> Rotas de Moderator
router.get('/moderator/all', Moderator.index);
router.get('/moderator/:id', Moderator.show);
router.post('/moderator', Moderator.create);
router.put('/moderator', Moderator.update);
router.delete('/moderator/:id', Moderator.deactivate);

// -> Rotas de Technician
router.get('/technician/all', Technician.index);
router.get('/technician/institution/:id_institution', Technician.indexByInstitution);
router.get('/technician/:id', Technician.show);
router.post('/technician', Technician.create);
router.put('/technician', Technician.update);
router.delete('/technician/:id', Technician.deactivate);

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
router.get('/statistics/user/type_relationship', AccessController.userTypeRelationship);
router.get('/statistics/user/monthly', AccessController.userByMonth);
router.get('/statistics/category/amount', Category.categoriesAmount);
router.get('/statistics/');
router.get('/statistics/');
router.get('/statistics/');
router.get('/statistics/');
router.get('/statistics/');
router.get('/statistics/');
router.get('/statistics/');

// -> Rotas de Erro 404
router.get('/ops', (_, res) => {
    res.status(404).send({ success: false, message: 'A rota solicitada não existe!' });
})

router.get('*', (_, res) => {
    res.redirect('/ops');
});

module.exports = router;