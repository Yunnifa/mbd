const db = require('../config/database'); // Import konfigurasi database

// Get All Feedback
exports.getAllFeedback = (callback) => {
    const query = 'CALL get_all_feedback()';
    db.query(query, [], callback);
};

// Get Feedback by ID
exports.getFeedbackById = (id, callback) => {
    const query = 'CALL get_feedback_by_id(?)';
    db.query(query, [id], callback);
};

// Add Feedback (Model)
exports.addFeedback = (id_user, id_kamar, rating, komentar, tanggal, callback) => {
    const query = 'CALL add_feedback(?, ?, ?, ?, ?)';
    db.query(query, [id_user, id_kamar, rating, komentar, tanggal], callback);
};


// Edit Feedback
exports.editFeedback = (id, rating, komentar, callback) => {
    const query = 'CALL edit_feedback(?, ?, ?)';
    db.query(query, [id, rating, komentar], callback);
};

// Delete Feedback
exports.deleteFeedback = (id, callback) => {
    const query = 'CALL delete_feedback(?)';
    db.query(query, [id], callback);
};

// Get Feedback by Name
exports.getFeedbackByName = (name, callback) => {
    const query = 'CALL get_feedback_by_name(?)';
    db.query(query, [name], callback);
};

//view
exports.getFeedbackUser = (callback) => {
    const query = 'SELECT * FROM view_feedback_user';
    db.query(query, [], callback);
};