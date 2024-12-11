const Pembayaran = require('../models/pembayaranModel');

// Get All Pembayaran
exports.getAllPembayaran = (req, res) => {
    Pembayaran.getAllPembayaran((err, results) => {
        if (err) return res.status(500).json({ message: err.sqlMessage });
        res.status(200).json({ pembayaran: results });
    });
};

// Get Pembayaran by ID
exports.getPembayaranById = (req, res) => {
    const { id } = req.params;
    Pembayaran.getPembayaranById(id, (err, results) => {
        if (err) return res.status(500).json({ message: err.sqlMessage });
        if (results.length === 0) return res.status(404).json({ message: 'Pembayaran tidak ditemukan' });
        res.status(200).json({ pembayaran: results[0] });
    });
};

// Add Pembayaran
exports.addPembayaran = (req, res) => {
    // Ambil nilai dari req.body
    const { id_reservasi, jumlah_pembayaran, tanggal_pembayaran } = req.body;

    // Validasi input
    if (!id_reservasi || !jumlah_pembayaran || !tanggal_pembayaran) {
        return res.status(400).json({ message: 'Semua data pembayaran diperlukan' });
    }

    // Panggil model untuk menambahkan pembayaran
    Pembayaran.addPembayaran(id_reservasi, jumlah_pembayaran, tanggal_pembayaran, (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.sqlMessage });
        }
        res.status(200).json({ message: 'Pembayaran berhasil ditambahkan', pembayaran: result });
    });
};


// Edit Pembayaran
exports.editPembayaran = (req, res) => {
    const { id } = req.params;
    const { total_tagihan, tanggal_pembayaran } = req.body;
    Pembayaran.editPembayaran(id, total_tagihan, tanggal_pembayaran, (err, results) => {
        if (err) return res.status(500).json({ message: err.sqlMessage });
        res.status(200).json({ message: 'Pembayaran berhasil diperbarui' });
    });
};

// Delete Pembayaran
exports.deletePembayaran = (req, res) => {
    const { id } = req.params;
    Pembayaran.deletePembayaran(id, (err, results) => {
        if (err) return res.status(500).json({ message: err.sqlMessage });
        res.status(200).json({ message: 'Pembayaran berhasil dihapus' });
    });
};

// Get Pembayaran by User Name
exports.getPembayaranByName = (req, res) => {
    const { name } = req.params;
    Pembayaran.getPembayaranByName(name, (err, results) => {
        if (err) return res.status(500).json({ message: err.sqlMessage });
        if (results.length === 0) return res.status(404).json({ message: 'Pembayaran tidak ditemukan untuk user tersebut' });
        res.status(200).json({ pembayaran: results });
    });
};

// Get Pembayaran by Reservasi ID
exports.getPembayaranByReservasiId = (req, res) => {
    const { id_reservasi } = req.params;
    Pembayaran.getPembayaranByReservasiId(id_reservasi, (err, results) => {
        if (err) return res.status(500).json({ message: err.sqlMessage });
        if (results.length === 0) return res.status(404).json({ message: 'Tidak ada pembayaran untuk reservasi tersebut' });
        res.status(200).json({ pembayaran: results });
    });
};

