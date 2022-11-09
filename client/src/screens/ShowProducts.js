import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Row, Col } from 'react-bootstrap'
import ProductCard from '../components/ProductCard';

const api = axios.create({
	baseURL: "http://localhost:8081/api/products",
});

const ShowProducts = () => {
	const [products, setProducts] = useState([])

	useEffect(() => {
		const getProducts = async () => {
			const { data } = await api.get('/allProducts')
			console.log(data)
			setProducts(data)
		}
		getProducts()
	}, [])

	return (
		<>
			<Container className='justify-content-center p-2'>
				<h1 className='text-center'>Show All</h1>
				<hr />
				<Row>
					{
						products.map(product => {
							return <Col key={product.id} md={8} lg={4} sm={12}>
								<ProductCard product={product} />
							</Col>
						})
					}
				</Row>
			</Container>
		</>
	)
}

export default ShowProducts