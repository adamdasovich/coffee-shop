import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Routes } from 'react-router'
import AddProduct from './screens/AddProduct'
import ShowProducts from './screens/ShowProducts'
import EditProduct from './screens/EditProduct'
import ProductDetail from './screens/ProductDetail'
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
	return (
		<Router>
			<Routes>
				<Route exact path='/addProduct' element={<AddProduct />}></Route>
				<Route exact path='/products' element={<ShowProducts />}></Route>
				<Route exact path='/product/edit/:id' element={<EditProduct />}></Route>
				<Route exact path='/product/:id' element={<ProductDetail />}></Route>
			</Routes>
		</Router>
	)
}

export default App