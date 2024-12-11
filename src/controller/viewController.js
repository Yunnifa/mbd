const view = require('../models/viewModel');

// Tampilkan data dari getTotalPendapatan
exports.getTotalPendapatan = (req, res) => {
    view.getTotalPendapatan((err, results) => {
        if (err) {
            return res.status(500).json({
                message: 'Terjadi kesalahan saat mengambil data total pendapatan.',
                error: err.sqlMessage || err.message,
            });
        }
        res.status(200).json({
            message: 'Data total pendapatan berhasil diambil.',
            data: results,
        });
    });
};

// Tampilkan data dari getTotalKamarPerTipe
exports.getTotalKamarPerTipe = (req, res) => {
    view.getTotalKamarPerTipe((err, results) => {
        if (err) {
            return res.status(500).json({
                message: 'Terjadi kesalahan saat mengambil data total kamar per tipe.',
                error: err.sqlMessage || err.message,
            });
        }
        res.status(200).json({
            message: 'Data total kamar per tipe berhasil diambil.',
            data: results,
        });
    });
};

// Controller untuk mendapatkan data reservasi user
exports.getReservasiUser = (req, res) => {
    view.getReservasiUser((err, results) => {
        if (err) {
            return res.status(500).json({
                message: 'Terjadi kesalahan saat mengambil data reservasi user.',
                error: err.sqlMessage || err.message,
            });
        }
        res.status(200).json({
            message: 'Data reservasi user berhasil diambil.',
            data: results,
        });
    });
};

// Controller untuk mendapatkan data feedback user
exports.getFeedbackUser = (req, res) => {
    view.getFeedbackUser((err, results) => {
        if (err) {
            return res.status(500).json({
                message: 'Terjadi kesalahan saat mengambil data feedback user.',
                error: err.sqlMessage || err.message,
            });
        }
        res.status(200).json({
            message: 'Data feedback user berhasil diambil.',
            data: results,
        });
    });
};

// Controller untuk mendapatkan data ketersediaan kamar
exports.getKetersediaanKamar = (req, res) => {
    view.getKetersediaanKamar((err, results) => {
        if (err) {
            return res.status(500).json({
                message: 'Terjadi kesalahan saat mengambil data ketersediaan kamar.',
                error: err.sqlMessage || err.message,
            });
        }
        res.status(200).json({
            message: 'Data ketersediaan kamar berhasil diambil.',
            data: results,
        });
    });
};


// Controller untuk menghitung total pendapatan berdasarkan tanggal
exports.getTotalPendapatanByDate = (req, res) => {
    const { tanggal } = req.body; // Mengambil tanggal dari request body

    // Validasi jika tanggal tidak ada atau tidak valid
    if (!tanggal) {
        return res.status(400).json({
            message: 'Tanggal harus diberikan dalam format YYYY-MM-DD.',
        });
    }

    view.getTotalPendapatanByDate(tanggal, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: 'Terjadi kesalahan saat menghitung total pendapatan.',
                error: err.sqlMessage || err.message,
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: 'Tidak ada data untuk tanggal tersebut.',
            });
        }

        res.status(200).json({
            message: `Total pendapatan pada tanggal ${tanggal} berhasil dihitung.`,
            data: results,
        });
    });
};