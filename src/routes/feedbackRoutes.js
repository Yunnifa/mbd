const express = require('express');
const router = express.Router();
const feedbackController = require('../controller/feedbackController');

// Routes
router.get('/all', feedbackController.getAllFeedback);
router.get('/:id', feedbackController.getFeedbackById);
router.post('/add/:id', feedbackController.addFeedback); // Role: User
router.put('/edit/:id', feedbackController.editFeedback); // Role: User
router.delete('/delete/:id', feedbackController.deleteFeedback); // Role: User/Admin
router.get('/user/:name', feedbackController.getFeedbackByName);
router.get('/', feedbackController.getFeedbackUser);

module.exports = router;