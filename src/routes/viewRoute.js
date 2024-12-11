const express = require('express');
const router = express.Router();
const viewController = require('../controller/viewController');

// Routes
router.get('/pendapatan', viewController.getTotalPendapatan);
router.get('/kamar-per-tipe', viewController.getTotalKamarPerTipe);
router.get('/reservasi-user', viewController.getReservasiUser);
router.get('/feedback-user', viewController.getFeedbackUser);
router.get('/ketersediaan-kamar', viewController.getKetersediaanKamar);

// Route untuk menghitung total pendapatan berdasarkan tanggal
router.post('/total-pendapatan', viewController.getTotalPendapatanByDate);

module.exports = router;