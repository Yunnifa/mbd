const express = require('express');
const router = express.Router();
const pembayaranController = require('../controllers/pembayaranController');

// Route untuk menambahkan pembayaran
router.post('/add', pembayaranController.addPembayaran);
router.get('/reservasi/:id_reservasi', pembayaranController.getPembayaranByReservasiId);

module.exports = router;

