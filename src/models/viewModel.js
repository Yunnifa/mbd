const db = require('../config/database'); // Import konfigurasi database

// Ambil data dari prosedur getTotalPendapatan
exports.getTotalPendapatan = (callback) => {
    const query = 'CALL getTotalPendapatan()';
    db.query(query, (err, results) => {
        if (err) return callback(err, null);
        callback(null, results[0]); // Hasil query pertama
    });
};

// Ambil data dari prosedur getTotalKamarPerTipe
exports.getTotalKamarPerTipe = (callback) => {
    const query = 'CALL getTotalKamarPerTipe()';
    db.query(query, (err, results) => {
        if (err) return callback(err, null);
        callback(null, results[0]); // Hasil query pertama
    });
};

// Fungsi untuk mendapatkan data dari prosedur CreateViewReservasiUser
exports.getReservasiUser = (callback) => {
    const query = 'CALL CreateViewReservasiUser()'; // Memanggil prosedur CreateViewReservasiUser
    db.query(query, (err, results) => {
        if (err) return callback(err, null);
        callback(null, results[0]); // Mengambil hasil dari query
    });
};

// Fungsi untuk mendapatkan data dari prosedur CreateViewFeedbackUser
exports.getFeedbackUser = (callback) => {
    const query = 'CALL CreateViewFeedbackUser()'; // Memanggil prosedur CreateViewFeedbackUser
    db.query(query, (err, results) => {
        if (err) return callback(err, null);
        callback(null, results[0]); // Mengambil hasil dari query
    });
};

// Fungsi untuk mendapatkan data dari prosedur CreateViewKetersediaanKamar
exports.getKetersediaanKamar = (callback) => {
    const query = 'CALL CreateViewKetersediaanKamar()'; // Memanggil prosedur CreateViewKetersediaanKamar
    db.query(query, (err, results) => {
        if (err) return callback(err, null);
        callback(null, results[0]); // Mengambil hasil dari query
    });
};

exports.getTotalPendapatanByDate = (tanggal, callback) => {
    const query = 'CALL getTotalPendapatanByDate(?)'; // Memanggil prosedur getTotalPendapatanByDate
    db.query(query, [tanggal], (err, results) => {
        if (err) return callback(err, null);
        callback(null, results[0]); // Mengambil hasil dari query
    });
};