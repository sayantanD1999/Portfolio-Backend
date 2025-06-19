const express = require("express");
const tokenValidation = require("../middlewares/authjwt");
// const { route } = require("express/lib/application");
const router = express.Router();
const { upload } = require("../utils/multer");
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const skillController = require("../controllers/skill.controller");
const imgController = require("../controllers/image.controller");
// const detailsController = require('../controllers/details.controller');
const validator = require("../validator/index");
const ApiUserValidator = new validator.UserValidator();
const ApiDetailsValidator = new validator.DetailsValidator();

//Auth
router.post("/api/signup", ApiUserValidator.signup(), authController.signup);
router.post("/api/signin", ApiUserValidator.signin(), authController.signin);
router.post("/api/signout", authController.signout);

// profile-image
router.patch(
  "/api/profile-img/:user_id",
  tokenValidation,
  upload.single("profile_img"),
  imgController.images
);

// Skills
router.patch("/api/skills", tokenValidation, skillController.skills);
router.get("/api/skills/:user_id", tokenValidation, skillController.skills);
router.post(
  "/api/skills",
  ApiDetailsValidator.Skill(),
  tokenValidation,
  skillController.skills
);
router.delete("/api/skills", tokenValidation, skillController.skills);

// User Details
router.get("/api/user/:user_id", tokenValidation, userController.user);
router.patch("/api/user", tokenValidation, userController.user);


// //Experince
// router.get('/api/experience/:user_id', tokenValidation, detailsController.experience);
// router.patch('/api/experience/:user_id', tokenValidation, detailsController.experience);

// //Education
// router.patch('/api/education/:user_id', ApiDetailsValidator.Education(), tokenValidation, detailsController.education);
// router.get('/api/education/:user_id', tokenValidation, detailsController.education);

// //projects
// router.post('/api/projects/:user_id', tokenValidation, upload.single('img'), detailsController.projects);
// router.patch('/api/projects/:_id', tokenValidation, upload.single('img'), detailsController.projects);
// router.get('/api/projects/:user_id', tokenValidation, detailsController.projects);
// router.delete('/api/projects/:_id', tokenValidation, detailsController.projects);

module.exports = router;
