// routes/pendapatanRoutes.js
const express = require('express');
const router = express.Router();
const pendapatanController = require('../controllers/pendapatanController');

router.get('/', pendapatanController.getTotalPendapatan);

module.exports = router;
