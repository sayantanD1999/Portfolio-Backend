const express = require("express");
const tokenValidation = require("../middlewares/authjwt");
const { route } = require("express/lib/application");
const router = express.Router();
const userController = require("../controllers/auth.controller");
const detailsController = require('../controllers/details.controller');

//Auth
router.post('/api/signup', userController.signup);
router.post('/api/signin', userController.signin);

//Details
router.get('/api/profile/:email', tokenValidation, detailsController.profileDetails);
router.patch('/api/skills/:id', tokenValidation, detailsController.skills);
router.get('/api/skills/:id', tokenValidation, detailsController.skills);

router.patch('/api/projects/:id', tokenValidation, detailsController.projects);
router.get('/api/projects/:id', tokenValidation, detailsController.projects);

module.exports = router;