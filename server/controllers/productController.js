const db = require('../models')

// create main model
const Product = db.products
const Review = db.reviews

// main work
// add a product
const addProduct = async (req, res) => {
	const { title, price, description } = req.body
	const product = await Product.create({
		title,
		price,
		description,
		published: req.body.published ? req.body.published : false
	})
	res.status(200).json(product)
	console.log(product)
}

// get all products
const getProducts = async (req, res) => {
	try {
		const products = await Product.findAll()
		res.status(200).json(products)
	} catch (error) {
		console.log(error)
	}
}

// get a product by id
const getProductById = async (req, res) => {
	const id = req.params.id
	try {
		const product = await Product.findOne({
			where: {
				id
			}
		})
		res.status(200).json(product)
	} catch (error) {
		console.log(error)
	}
}

// update a product using id
const updateProduct = async (req, res) => {
	const id = req.params.id
	const data = {
		title: req.body.title,
		price: req.body.price,
		description: req.body.description,
		published: req.body.published ? req.body.published : false
	}
	try {
		const updatedProduct = await Product.update(
			data,
			{
				where: {
					id
				}
			}
		)
		res.status(200).json(updatedProduct)
	} catch (error) {
		console.log(error)
	}
}

// delete
const deleteProduct = async (req, res) => {
	const { id } = req.params
	try {
		const deleteProduct = await Product.destroy({
			where: {
				id
			}
		})
		res.status(200).send('Product has been deleted.')
	} catch (error) {
		console.log(error)
	}
}

// get published product
const getPublished = async (req, res) => {
	try {
		const published = await Product.findAll({ where: { published: true } })
	} catch (error) {
		console.log(error)
	}
}

//connect one to many relation products and reviews
const getProductReviews = async (req, res) => {
	const { id } = req.params
	const data = await Product.findOne({
		include: [{
			model: Review,
			as: 'review'
		}],
		where: { id }
	})
	console.log(data)
	res.status(200).send(data)
}

module.exports = {
	addProduct,
	deleteProduct,
	updateProduct,
	getProductById,
	getProducts,
	getPublished,
	getProductReviews
}