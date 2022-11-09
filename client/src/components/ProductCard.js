import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {

	return (
		<>
			<Card className='mt-2 p-2 shadow-sm rounded' style={{ width: '18rem' }}>
				<Card.Body>
					<Card.Title>{product.title}</Card.Title>
					<Card.Title>Price: ${product.price}</Card.Title>
					<Card.Text>
						Description: {product.description}
					</Card.Text>
				</Card.Body>
				<Link to={`/product/${product.id}`}>
					<Button>Detail</Button>
				</Link>
			</Card>
		</>
	)
}

export default ProductCard