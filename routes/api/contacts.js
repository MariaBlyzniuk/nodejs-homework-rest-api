const express = require('express');

const ctrl = require("../../controllers/contacts");

const {schemas} = require("../../models/contact");

const {validateBody, isValidId} = require("../../middlewares");

const router = express.Router()


router.get('/', ctrl.listContactsController);

router.get('/:contactId', isValidId, ctrl.getContactByIdController);

router.post('/', validateBody(schemas.addSchema), ctrl.addContactController)


router.put('/:contactId', isValidId, validateBody(schemas.addSchema), ctrl.updateContactController);

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateContactFavoriteByIdController);

router.delete('/:contactId', isValidId, ctrl.removeContactController);

module.exports = router;
