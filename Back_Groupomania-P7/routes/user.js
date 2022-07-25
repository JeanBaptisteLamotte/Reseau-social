const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const { validate, checkValidation } = require('../middleware/validator');

router.post('/signup', validate, checkValidation, userCtrl.signup);
router.post('/login', validate, checkValidation, userCtrl.login);

module.exports = router;
