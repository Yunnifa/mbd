const Reservasi = require('../models/reservasiModel');

// Get All Reservasi
exports.getAllReservasi = (req, res) => {
    Reservasi.getAllReservasi((err, results) => {
        if (err) return res.status(500).json({ message: err.sqlMessage });
        res.status(200).json({ reservasi: results });
    });
};

// Get Reservasi by ID
exports.getReservasiById = (req, res) => {
    const { id } = req.params;
    Reservasi.getReservasiById(id, (err, results) => {
        if (err) return res.status(500).json({ message: err.sqlMessage });
        res.status(200).json({ reservasi: results });
    });
};

// Get Reservasi by User
exports.getReservasiByUser = (req, res) => {
    const { nama } = req.params;
    Reservasi.getReservasiByUser(nama, (err, results) => {
        if (err) return res.status(500).json({ message: err.sqlMessage });
        res.status(200).json({ reservasi: results });
    });
};

// Add Reservasi
exports.addReservasi = (req, res) => {
    const { id_user, id_kamar, tanggal_checkin, tanggal_checkout } = req.body;
    Reservasi.addReservasi(id_user, id_kamar, tanggal_checkin, tanggal_checkout, (err, results) => {
        if (err) return res.status(500).json({ message: err.sqlMessage });
        res.status(200).json({ message: 'Reservasi berhasil ditambahkan' });
    });
};

// Edit Reservasi
exports.editReservasi = (req, res) => {
    const { id_reservasi } = req.params;
    const { id_kamar, tanggal_checkin, tanggal_checkout } = req.body;
    Reservasi.editReservasi(id_reservasi, id_kamar, tanggal_checkin, tanggal_checkout, (err, results) => {
        if (err) return res.status(500).json({ message: err.sqlMessage });
        res.status(200).json({ message: 'Reservasi berhasil diperbarui' });
    });
};

// Cancel Reservasi
exports.cancelReservasi = (req, res) => {
    const { id } = req.params;
    Reservasi.cancelReservasi(id, (err, results) => {
        if (err) return res.status(500).json({ message: err.sqlMessage });
        res.status(200).json({ message: 'Reservasi dibatalkan' });
    });
};

// Delete Reservasi
exports.deleteReservasi = (req, res) => {
    const { id } = req.params;
    Reservasi.deleteReservasi(id, (err, results) => {
        if (err) return res.status(500).json({ message: err.sqlMessage });
        res.status(200).json({ message: 'Reservasi berhasil dihapus' });
    });
};

// Update Status Reservasi (admin only)
exports.updateStatusReservasi = (req, res) => {
    const { id } = req.params;
    const { status_reservasi } = req.body;
    Reservasi.updateStatusReservasi(id, status_reservasi, (err, results) => {
        if (err) return res.status(500).json({ message: err.sqlMessage });
        res.status(200).json({ message: 'Status reservasi diperbarui' });
    });
};

//view
exports.getReservasiUser = (req, res) => {
    reservasiModel.getReservasiUser((err, results) => {
        if (err) return res.status(500).json({ message: err.sqlMessage });
        res.status(200).json({ reservasi_user: results });
    });
};