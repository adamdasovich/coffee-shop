import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

const api = axios.create({
	baseURL: "http://localhost:8081/api/products",
});

const AddProduct = () => {

	const navigate = useNavigate()

	const [title, setTitle] = useState('')
	const [price, setPrice] = useState('')
	const [description, setDescription] = useState('')

	const addProductHandler = async (e) => {
		e.preventDefault()
		const data = {
			title,
			price,
			description,
			published: true
		}

		await api.post('addProduct', data)
		navigate('/products')
	}

	return (
		<>
			<Container className='mt-5'>
				<h1>Add Product</h1>
				<hr />
				<Form onSubmit={addProductHandler}>
					<Form.Group className="mb-3" controlId="title">
						<Form.Label>Title</Form.Label>
						<Form.Control
							value={title}
							onChange={e => setTitle(e.target.value)}
							type="text" />
					</Form.Group>
					<Form.Group className="mb-3" controlId="price">
						<Form.Label>Price $</Form.Label>
						<Form.Control
							value={price}
							onChange={e => setPrice(e.target.value)}
							type="number" />
					</Form.Group>
					<Form.Group className="mb-3" controlId="description">
						<Form.Label>Description</Form.Label>
						<Form.Control
							value={description}
							onChange={e => setDescription(e.target.value)}
							type="textarea" />
					</Form.Group>
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			</Container>
		</>
	)
}

export default AddProduct