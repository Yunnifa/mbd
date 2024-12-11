const Feedback = require('../models/feedbackModel');

// Get All Feedback
exports.getAllFeedback = (req, res) => {
    Feedback.getAllFeedback((err, results) => {
        if (err) return res.status(500).json({ message: err.sqlMessage });
        res.status(200).json({ feedback: results });
    });
};

// Get Feedback by ID
exports.getFeedbackById = (req, res) => {
    const { id } = req.params;
    Feedback.getFeedbackById(id, (err, results) => {
        if (err) return res.status(500).json({ message: err.sqlMessage });
        if (results.length === 0) return res.status(404).json({ message: 'Feedback tidak ditemukan' });
        res.status(200).json({ feedback: results[0] });
    });
};

// Add Feedback
exports.addFeedback = (req, res) => {
    const { id } = req.params; // Mengambil id_user dari URL parameter
    const { id_kamar, rating, komentar, tanggal } = req.body; // Mengambil data dari body request
    
    // Memastikan semua data diterima
    if (!id_kamar || !rating || !komentar || !tanggal) {
        return res.status(400).json({ message: 'Semua data diperlukan' });
    }

    // Pastikan tanggal dalam format yang benar, bisa menggunakan moment.js atau lainnya
    const formattedTanggal = new Date(tanggal).toISOString();

    // Panggil model untuk menambah feedback
    Feedback.addFeedback(id, id_kamar, rating, komentar, formattedTanggal, (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.sqlMessage });
        }
        res.status(200).json({ message: 'Feedback berhasil ditambahkan', feedback: result });
    });
};


// Edit Feedback
exports.editFeedback = (req, res) => {
    const { id } = req.params;
    const { rating, komentar } = req.body;
    Feedback.editFeedback(id, rating, komentar, (err, results) => {
        if (err) return res.status(500).json({ message: err.sqlMessage });
        res.status(200).json({ message: 'Feedback berhasil diperbarui' });
    });
};

// Delete Feedback
exports.deleteFeedback = (req, res) => {
    const { id } = req.params;
    Feedback.deleteFeedback(id, (err, results) => {
        if (err) return res.status(500).json({ message: err.sqlMessage });
        res.status(200).json({ message: 'Feedback berhasil dihapus' });
    });
};

// Get Feedback by User Name
exports.getFeedbackByName = (req, res) => {
    const { name } = req.params;
    Feedback.getFeedbackByName(name, (err, results) => {
        if (err) return res.status(500).json({ message: err.sqlMessage });
        if (results.length === 0) return res.status(404).json({ message: 'Feedback tidak ditemukan untuk user tersebut' });
        res.status(200).json({ feedback: results });
    });
};

//view
exports.getFeedbackUser = (req, res) => {
    feedbackModel.getFeedbackUser((err, results) => {
        if (err) return res.status(500).json({ message: err.sqlMessage });
        res.status(200).json({ feedback_user: results });
    });
};