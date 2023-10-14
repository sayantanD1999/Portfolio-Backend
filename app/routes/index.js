const express = require("express");
const tokenValidation = require("../middlewares/authjwt");
const { route } = require("express/lib/application");
const router = express.Router();
const userController = require("../controllers/auth.controller");
const detailsController = require('../controllers/details.controller');
const UserValidator = require("../validator/user");
const ApiUserValidator = new UserValidator();

//Auth
router.post('/api/signup', ApiUserValidator.signup(), userController.signup);
router.post('/api/signin', ApiUserValidator.signin(), userController.signin);

//Profile Details
router.get('/api/profile/:user_id', tokenValidation, detailsController.profileDetails);
router.put('/api/profile/:user_id', tokenValidation, detailsController.profileDetails);
router.post('/api/profile/:user_id', tokenValidation, detailsController.profileDetails);


//Skills
router.post('/api/skills', tokenValidation, detailsController.skills);
router.patch('/api/skills/:user_id', tokenValidation, detailsController.skills);
router.get('/api/skills/:user_id', tokenValidation, detailsController.skills);


//projects
router.patch('/api/projects/:user_id', tokenValidation, detailsController.projects);
router.get('/api/projects/:user_id', tokenValidation, detailsController.projects);

module.exports = router;