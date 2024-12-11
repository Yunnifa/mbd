const express = require('express');
const router = express.Router();
const kamarController = require('../controller/kamarController');

// Routes
router.get('/all', kamarController.getAllKamar);
router.get('/:id', kamarController.getKamarById);
router.post('/add', kamarController.addKamar); // Role: Admin
router.put('/edit/:id', kamarController.editKamar); // Role: Admin
router.delete('/delete/:id', kamarController.deleteKamar); // Role: Admin
router.delete('/reservasi/:id', kamarController.deleteReservasi);
router.delete('/kamar/:id', kamarController.deleteKamar);

router.post('/search-kamar', kamarController.searchKamarByTipe);

module.exports = router;
