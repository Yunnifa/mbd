const Kamar = require('../models/kamarModel');

// Get All Kamar
exports.getAllKamar = (req, res) => {
    Kamar.getAllKamar((err, results) => {
        if (err) return res.status(500).json({ message: err.sqlMessage });
        res.status(200).json({ kamar: results });
    });
};

// Get Kamar by ID
exports.getKamarById = (req, res) => {
    const id_kamar = req.params.id;

    Kamar.getKamarById(id_kamar, (err, results) => {
        if (err) return res.status(500).json({ message: err.sqlMessage });
        if (!results.length) return res.status(404).json({ message: 'Kamar not found' });
        res.status(200).json({ kamar: results[0] });
    });
};

// Add Kamar (Admin)
exports.addKamar = (req, res) => {
    const { tipe_kamar, harga, ketersediaan } = req.body;

    Kamar.addKamar({ tipe_kamar, harga, ketersediaan }, (err, results) => {
        if (err) return res.status(500).json({ message: err.sqlMessage });
        res.status(201).json({ message: 'Kamar added successfully', results });
    });
};

// Edit Kamar (Admin)
exports.editKamar = (req, res) => {
    const id_kamar = req.params.id;
    const { tipe_kamar, harga, ketersediaan } = req.body;

    Kamar.editKamar({ id_kamar, tipe_kamar, harga, ketersediaan }, (err, results) => {
        if (err) return res.status(500).json({ message: err.sqlMessage });
        res.status(200).json({ message: 'Kamar updated successfully', results });
    });
};

// Delete Kamar (Admin)
exports.deleteKamar = (req, res) => {
    const id_kamar = req.params.id;

    Kamar.deleteKamar(id_kamar, (err, results) => {
        if (err) return res.status(500).json({ message: err.sqlMessage });
        res.status(200).json({ message: 'Kamar deleted successfully', results });
    });
};

// Menghapus reservasi (user)
exports.deleteReservasi = (req, res) => {
    const { id } = req.params;

    // Validasi: Pastikan id ada
    if (!id) {
        return res.status(400).json({ message: 'ID reservasi diperlukan' });
    }

    // Menghapus reservasi berdasarkan ID
    Kamar.deleteReservasi(id, (err, results) => {
        if (err) return res.status(500).json({ message: err.sqlMessage });
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Reservasi tidak ditemukan' });
        }
        res.status(200).json({ message: 'Reservasi berhasil dihapus' });
    });
};

// Menghapus kamar
exports.deleteKamar = (req, res) => {
    const { id } = req.params;

    // Validasi: Pastikan id ada
    if (!id) {
        return res.status(400).json({ message: 'ID kamar diperlukan' });
    }

    // Menghapus kamar berdasarkan ID
    Kamar.deleteKamar(id, (err, results) => {
        if (err) return res.status(500).json({ message: err.sqlMessage });
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Kamar tidak ditemukan' });
        }
        res.status(200).json({ message: 'Kamar berhasil dihapus' });
    });
};

// Controller untuk mencari kamar berdasarkan tipe kamar
exports.searchKamarByTipe = (req, res) => {
    const { tipe } = req.body; // Mengambil tipe kamar dari body request

    // Validasi jika tipe tidak ada atau tidak valid
    if (!tipe || !['standar', 'deluxe', 'suite'].includes(tipe)) {
        return res.status(400).json({
            message: 'Tipe kamar harus salah satu dari standar, deluxe, atau suite.',
        });
    }

    Kamar.searchKamarByTipe(tipe, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: 'Terjadi kesalahan saat mencari kamar.',
                error: err.sqlMessage || err.message,
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: 'Tidak ada kamar yang tersedia dengan tipe tersebut.',
            });
        }

        res.status(200).json({
            message: `Kamar dengan tipe ${tipe} berhasil ditemukan.`,
            data: results,
        });
    });
};

