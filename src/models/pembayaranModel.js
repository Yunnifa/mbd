const db = require('../config/database'); // Import konfigurasi database

// Get All Pembayaran
exports.getAllPembayaran = (callback) => {
    const query = 'CALL get_all_pembayaran()';
    db.query(query, [], callback);
};

// Get Pembayaran by ID
exports.getPembayaranById = (id, callback) => {
    const query = 'CALL get_pembayaran_by_id(?)';
    db.query(query, [id], callback);
};

// Add Pembayaran
exports.addPembayaran = (id_reservasi, jumlah_pembayaran, tanggal_pembayaran, callback) => {
    // Menggunakan stored procedure untuk menambahkan pembayaran
    const query = 'CALL add_pembayaran(?, ?, ?)';
    db.query(query, [id_reservasi, jumlah_pembayaran, tanggal_pembayaran], (err, results) => {
        if (err) {
            return callback(err, null);  // Pastikan jika ada error, akan dikembalikan dengan benar
        }
        // Hasil yang diterima dari stored procedure
        callback(null, results);
    });
};

// Edit Pembayaran
exports.editPembayaran = (id, total_tagihan, tanggal_pembayaran, callback) => {
    const query = 'CALL edit_pembayaran(?, ?, ?)';
    db.query(query, [id, total_tagihan, tanggal_pembayaran], callback);
};

// Delete Pembayaran
exports.deletePembayaran = (id, callback) => {
    const query = 'CALL delete_pembayaran(?)';
    db.query(query, [id], callback);
};

// Get Pembayaran by Name
exports.getPembayaranByName = (name, callback) => {
    const query = 'CALL get_pembayaran_by_name(?)';
    db.query(query, [name], callback);
};

// Get Pembayaran by Reservasi ID
exports.getPembayaranByReservasiId = (id_reservasi, callback) => {
    const query = `
        SELECT * FROM pembayaran
        WHERE id_reservasi = ?
    `;
    db.query(query, [id_reservasi], callback);
};


