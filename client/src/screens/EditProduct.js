import React, { useState, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router'
import axios from 'axios'

const api = axios.create({
	baseURL: "http://localhost:8081/api/products",
});

const EditProduct = () => {
	const { id } = useParams()
	const navigate = useNavigate()

	const [title, setTitle] = useState('')
	const [price, setPrice] = useState(0)
	const [description, setDescription] = useState('')

	//Get the desired product we want to edit
	useEffect(() => {
		const getDataById = async () => {
			const { data } = await api.get(`/${id}`)
			console.log(id)
			setTitle(data.title)
			setPrice(data.price)
			setDescription(data.description)
		}
		getDataById()
	}, [id])

	//Make appropriate changes
	const editProductHandler = async (e) => {
		e.preventDefault()
		const { data } = await api.put(`/${id}`, {
			title,
			price,
			description,
			published: true
		})
		console.log(data)
		navigate('/products')
	}

	return (
		<>
			<Container className='mt-5'>
				<h1>Edit Product</h1>
				<hr />
				<Form onSubmit={editProductHandler}>
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
						Submit Changes
					</Button>
				</Form>
			</Container>
		</>
	)
}

export default EditProduct