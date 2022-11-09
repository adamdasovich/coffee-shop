const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const path = require('path')

dotenv.config();

//process.env.NODE_ENV => production or undefined


// Middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
	//server static content
	//npm run build
	app.use(express.static(path.join(__dirname, 'client/build')))
}


//routers
const productRouter = require('./routes/productRoutes.js')
app.use('/api/products', productRouter)

const reviewRouter = require('./routes/reviewRoutes.js')
app.use('/api/reviews', reviewRouter)


// testing api
app.get('/', (req, res) => {
	res.json({ message: 'Hello World' });
});

const PORT = process.env.PORT || 8081

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
