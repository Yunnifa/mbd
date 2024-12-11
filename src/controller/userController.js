const User = require('../models/userModels');

// Register User
exports.registerUser = (req, res) => {
    const { nama, email, password, role } = req.body;

    User.registerUser({ nama, email, password, role }, (err, results) => {
        if (err) return res.status(500).json({ message: err.sqlMessage });
        res.status(201).json({ message: 'User registered successfully', results });
    });
};

// Login User
exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    User.loginUser({ email, password }, (err, results) => {
        if (err) return res.status(500).json({ message: err.sqlMessage });
        if (!results.length) return res.status(404).json({ message: 'Invalid credentials' });
        res.status(200).json({ message: 'Login successful', user: results[0] });
    });
};

// Edit User
exports.editUser = (req, res) => {
    const id_user = req.params.id;
    const { nama, email, password, role } = req.body;

    User.editUser({ id_user, nama, email, password, role }, (err, results) => {
        if (err) return res.status(500).json({ message: err.sqlMessage });
        res.status(200).json({ message: 'User updated successfully', results });
    });
};

// Delete User
exports.deleteUser = (req, res) => {
    const id_user = req.params.id;

    User.deleteUser(id_user, (err, results) => {
        if (err) return res.status(500).json({ message: err.sqlMessage });
        res.status(200).json({ message: 'User deleted successfully', results });
    });
};

// Get All Users
exports.getAllUsers = (req, res) => {
    User.getAllUsers((err, results) => {
        if (err) return res.status(500).json({ message: err.sqlMessage });
        res.status(200).json({ users: results });
    });
};

// Get User by ID
exports.getUserById = (req, res) => {
    const id_user = req.params.id;

    User.getUserById(id_user, (err, results) => {
        if (err) return res.status(500).json({ message: err.sqlMessage });
        if (!results.length) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ user: results[0] });
    });
};

// Menghapus user
exports.deleteUser = (req, res) => {
    const { id } = req.params;

    // Validasi: Pastikan id ada
    if (!id) {
        return res.status(400).json({ message: 'ID user diperlukan' });
    }

    // Menghapus user berdasarkan ID
    User.deleteUser(id, (err, results) => {
        if (err) return res.status(500).json({ message: err.sqlMessage });
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User tidak ditemukan' });
        }
        res.status(200).json({ message: 'User berhasil dihapus' });
    });
};