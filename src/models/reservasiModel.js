const db = require('../config/database'); // Import konfigurasi database

// Get All Reservasi
exports.getAllReservasi = (callback) => {
    const query = 'CALL get_all_reservasi()';
    db.query(query, [], callback);
};

// Get Reservasi by ID
exports.getReservasiById = (id_reservasi, callback) => {
    const query = 'CALL get_reservasi_by_id(?)';
    db.query(query, [id_reservasi], callback);
};

// Get Reservasi by User
exports.getReservasiByUser = (nama_user, callback) => {
    const query = 'CALL get_reservasi_by_user(?)';
    db.query(query, [nama_user], callback);
};

// Add Reservasi
exports.addReservasi = (id_user, id_kamar, tanggal_checkin, tanggal_checkout, callback) => {
    const query = 'CALL add_reservasi(?, ?, ?, ?)';
    db.query(query, [id_user, id_kamar, tanggal_checkin, tanggal_checkout], callback);
};

// Edit Reservasi
exports.editReservasi = (id_reservasi, id_kamar, tanggal_checkin, tanggal_checkout, callback) => {
    const query = 'CALL edit_reservasi(?, ?, ?, ?)';
    db.query(query, [id_reservasi, id_kamar, tanggal_checkin, tanggal_checkout], callback);
};

// Cancel Reservasi
exports.cancelReservasi = (id_reservasi, callback) => {
    const query = 'CALL cancel_reservasi(?)';
    db.query(query, [id_reservasi], callback);
};

// Delete Reservasi
exports.deleteReservasi = (id_reservasi, callback) => {
    const query = 'CALL delete_reservasi(?)';
    db.query(query, [id_reservasi], callback);
};

// Update Status Reservasi
exports.updateStatusReservasi = (id_reservasi, status_reservasi, callback) => {
    const query = 'CALL update_status_reservasi(?, ?)';
    db.query(query, [id_reservasi, status_reservasi], callback);
};

//view
exports.getReservasiUser = (callback) => {
    const query = 'SELECT * FROM view_reservasi_user';
    db.query(query, [], callback);
};