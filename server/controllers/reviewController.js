const db = require('../models')

const Review = db.reviews

//add review

const addReview = async (req, res) => {
	const { id } = req.params
	const { rating, description } = req.body
	try {
		const review = await Review.create({
			product_id: id,
			rating,
			description
		})
		res.status(200).json(review)
	} catch (error) {
		console.log(error)
	}
}

//get all reviews

const getReviews = async (req, res) => {
	try {
		const reviews = await Review.findAll()
		res.status(200).json(reviews)
	} catch (error) {
		console.log(error)
	}
}

//get a review by id

const getReviewById = async (req, res) => {
	const id = req.params.id
	try {
		const review = await Review.findOne({
			where: {
				id
			}
		})
		res.status(200).json(review)
	} catch (error) {
		console.log(error)
	}
}

module.exports = {
	addReview,
	getReviews,
	getReviewById
}

