const express = require('express');
const router = express.Router();
const pembayaranController = require('../controller/pembayaranController');

// Routes
router.get('/all', pembayaranController.getAllPembayaran);
router.get('/:id', pembayaranController.getPembayaranById);
router.post('/add', pembayaranController.addPembayaran); // Role: Admin
router.put('/edit/:id', pembayaranController.editPembayaran); // Role: Admin
router.delete('/delete/:id', pembayaranController.deletePembayaran); // Role: Admin
router.get('/user/:name', pembayaranController.getPembayaranByName);
router.get('/reservasi/:id_reservasi', pembayaranController.getPembayaranByReservasiId);


//view


module.exports = router;
