const db = require('../config/database'); // Import konfigurasi database

// Get All Kamar
exports.getAllKamar = (callback) => {
    const query = 'CALL get_all_kamar()';
    db.query(query, [], callback);
};

// Get Kamar by ID
exports.getKamarById = (id_kamar, callback) => {
    const query = 'CALL get_kamar_by_id(?)';
    db.query(query, [id_kamar], callback);
};

// Add Kamar (Admin)
exports.addKamar = (data, callback) => {
    const { tipe_kamar, harga, ketersediaan } = data;
    const query = 'CALL add_kamar(?, ?, ?)';
    db.query(query, [tipe_kamar, harga, ketersediaan], callback);
};

// Edit Kamar (Admin)
exports.editKamar = (data, callback) => {
    const { id_kamar, tipe_kamar, harga, ketersediaan } = data;
    const query = 'CALL edit_kamar(?, ?, ?, ?)';
    db.query(query, [id_kamar, tipe_kamar, harga, ketersediaan], callback);
};

// Delete Kamar (Admin)
exports.deleteKamar = (id_kamar, callback) => {
    const query = 'CALL delete_kamar(?)';
    db.query(query, [id_kamar], callback);
};

// Menghapus reservasi (user)
exports.deleteReservasi = (id, callback) => {
    const query = 'CALL delete_reservasi(?)';  // Menggunakan stored procedure untuk menghapus reservasi
    db.query(query, [id], callback);
};

// Menghapus kamar
exports.deleteKamar = (id, callback) => {
    const query = 'CALL delete_kamar(?)';  // Menggunakan stored procedure untuk menghapus kamar
    db.query(query, [id], callback);
};

exports.searchKamarByTipe = (tipe, callback) => {
    const query = 'CALL searchKamarByTipe(?)'; // Memanggil prosedur searchKamarByTipe
    db.query(query, [tipe], (err, results) => {
        if (err) return callback(err, null);
        callback(null, results[0]); // Mengambil hasil dari query
    });
};