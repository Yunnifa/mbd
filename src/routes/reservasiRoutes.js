const express = require('express');
const router = express.Router();
const reservasiController = require('../controller/reservasiController');

// Routes
router.get('/all', reservasiController.getAllReservasi); // Get all reservasi
router.get('/:id', reservasiController.getReservasiById); // Get reservasi by id
router.get('/user/:nama', reservasiController.getReservasiByUser); // Get reservasi by user name
router.post('/add', reservasiController.addReservasi); // Add reservasi
router.put('/edit/:id', reservasiController.editReservasi); // Edit reservasi (admin only)
router.put('/cancel/:id', reservasiController.cancelReservasi); // Cancel reservasi
router.delete('/delete/:id', reservasiController.deleteReservasi); // Delete reservasi (admin only)
router.put('/status/:id', reservasiController.updateStatusReservasi); // Update status reservasi (admin only)
router.get('/', reservasiController.getReservasiUser);

module.exports = router;
