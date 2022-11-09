import React, { useEffect, useState } from 'react'
import { Card, Button, Container, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router'
import axios from 'axios'

const api = axios.create({
	baseURL: "http://localhost:8081/api",
});



const ProductDetail = () => {

	const navigate = useNavigate()
	const { id } = useParams()

	const [title, setTitle] = useState('')
	const [price, setPrice] = useState('')
	const [description, setDescription] = useState('')
	const [reviews, setReviews] = useState([])

	//rating, comment
	const [rating, setRating] = useState('')
	const [comment, setComment] = useState('')

	useEffect(() => {
		const getSingleProductData = async () => {
			const { data } = await api.get(`products/productReviews/${id}`)
			console.log(data)

			setTitle(data.title)
			setPrice(data.price)
			setDescription(data.description)
			//for Reviews
			setReviews(data.review)
			setRating(data.rating)
			setComment(data.comment)
		}
		getSingleProductData()

	}, [id])

	//Handle Delete
	const handleDelete = async (id) => {
		await api.delete(`products/${id}`)
		navigate('/products')
	}

	//AddReview Handler
	const addReviewHandler = async (e) => {
		e.preventDefault()
		const review = await api.post(`/reviews/addReview/${id}`, {
			product_id: id,
			rating,
			comment
		})
		console.log(review.comment)
		navigate('/products')
	}

	return (
		<>
			<Container>
				<h2>Product Details</h2>
				<Card className='mt-2 p-2 shadow-sm rounded' style={{ width: '18rem' }}>
					<Card.Body>
						<Card.Title>Title: {title}</Card.Title>
						<Card.Title>Price: ${price}</Card.Title>
						<Card.Text>
							Description: {description}
						</Card.Text>
						<br />
						<h4>Reviews:</h4>
						<br />
						{reviews.length > 0 ? (
							reviews.map(review => {
								return <p key={review.id}>Rating: {review.rating}<br /> {review.description}</p>
							})
						) : (<p>No reviews for this product.</p>)}

						<Link to={`/product/edit/${id}`}>
							<Button className='p-2 m-2'>Edit</Button>
						</Link>
						<Button
							className='btn btn-danger m-2'
							onClick={() => handleDelete(id)}>Delete</Button>
					</Card.Body>
				</Card>
			</Container>
			<br />
			<Container>
				<h2>Add Review</h2>
				<hr />
				<Form onSubmit={addReviewHandler}>
					<Form.Group className="mb-3" controlId="rating">
						<Form.Label>Rating</Form.Label>
						<Form.Control
							value={rating}
							onChange={e => setRating(e.target.value)}
							type="number" />
					</Form.Group>
					<Form.Group className="mb-3" controlId="comment">
						<Form.Label>Comment</Form.Label>
						<Form.Control
							value={comment}
							onChange={e => setComment(e.target.value)}
							type="textarea" />
					</Form.Group>
					<Button variant="primary" type="submit">
						Add Review
					</Button>
				</Form>
			</Container>
		</>
	)
}

export default ProductDetail