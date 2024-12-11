const db = require('../config/database'); // Import konfigurasi database

// Register User
exports.registerUser = (data, callback) => {
    const { nama, email, password, role } = data;

    // Cek jika role tidak ada, maka atur default 'user'
    const roleToUse = role || 'user'; // Jika role kosong atau null, maka set default 'user'

    const query = 'CALL register_user(?, ?, ?, ?)';
    db.query(query, [nama, email, password, roleToUse], callback);
};


// Login User
exports.loginUser = (data, callback) => {
    const { email, password } = data;
    const query = 'CALL login_user(?, ?)';
    db.query(query, [email, password], callback);
};

// Edit User
exports.editUser = (data, callback) => {
    const { id_user, nama, email, password, role } = data;
    const query = 'CALL edit_user(?, ?, ?, ?, ?)';
    db.query(query, [id_user, nama, email, password, role], callback);
};

// Delete User
exports.deleteUser = (id_user, callback) => {
    const query = 'CALL delete_user(?)';
    db.query(query, [id_user], callback);
};

// Get All Users
exports.getAllUsers = (callback) => {
    const query = 'CALL get_all_users()';
    db.query(query, [], callback);
};

// Get User by ID
exports.getUserById = (id_user, callback) => {
    const query = 'CALL get_user_by_id(?)';
    db.query(query, [id_user], callback);
};

// Menghapus user
exports.deleteUser = (id, callback) => {
    const query = 'CALL delete_user(?)';  // Menggunakan stored procedure untuk menghapus user
    db.query(query, [id], callback);
};