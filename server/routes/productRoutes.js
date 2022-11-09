const express = require('express');


const productController = require('../controllers/productController')

const productRouter = express.Router()

productRouter.post('/addProduct', productController.addProduct)
productRouter.get('/allProducts', productController.getProducts)
productRouter.get('published', productController.getPublished)

//Product reviews
productRouter.get('/productReviews/:id', productController.getProductReviews)

productRouter.put('/:id', productController.updateProduct)
productRouter.get('/:id', productController.getProductById)
productRouter.delete('/:id', productController.deleteProduct)

module.exports = productRouter