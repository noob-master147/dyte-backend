// if (process.env.NODE_ENV !== 'production') {
	// require('dotenv').config()
// }

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const app = express();


app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: true }))

// ROUTES
app.use('/', require('./routes/index'))

// Connect to Database
// mongoose.connect(config.mongodb.uri, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// 	useFindAndModify: false
// },
// 	() => {
// 		console.log(chalk.green.bold('Connected to MongoDB'))
// 	})


module.exports = app;
