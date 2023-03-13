const express = require("express");

const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/auth");
const {validateBody} = require("../../middlewares");

const {
    authTokenCheckMiddleware,
} = require("../../middlewares/authTokenCheck");

const router = express.Router();

router.use(authTokenCheckMiddleware);

router.post("/signup",validateBody(schemas.registerSchema), ctrl.registrationController);

router.post("/login", validateBody(schemas.loginSchema), ctrl.loginController);

router.get("/logout", ctrl.logoutController);

router.get("/current", ctrl.getCurrentUserController);

router.patch("/", validateBody, ctrl.updateSubscriptionController);

module.exports = router;