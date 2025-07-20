
const express = require('express');
const router = express.Router();
const controller = require('../controllers/formController');

router.get('/', controller.index);
router.get('/submit', controller.getForm);
router.post('/submit', controller.postForm);

module.exports = router;
