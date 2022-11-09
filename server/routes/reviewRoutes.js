const express = require('express');
const reviewController = require('../controllers/reviewController');

const reviewRouter = express.Router();

reviewRouter.get('/allReviews', reviewController.getReviews);
reviewRouter.post('/addReview/:id', reviewController.addReview);

reviewRouter.get('/:id', reviewController.getReviewById);

module.exports = reviewRouter;