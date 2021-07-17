const express = require('express');
const router = express.Router();
const controller = require('../controllers/index')
const chalk = require('chalk')
const { authenticate } = require('../middlewares/authenticate')


// BASE ROUTE
router.get('/', (req, res) => {
	res.send({
		statusCode: 200,
		payload: {
			msg: "The backend is healthy and running"
		},
	}).status(200)
})



/** Trigger TEST ROUTE
 * @apiIgnore
 * @api {post} /trigger Trigger Webhook
 * @apiName Trigger
 * @apiGroup Webhook
 *
 * 
 */ //Trigger TEST ROUTE
router.post('/trigger', async (req, res, next) => {
	console.log(req.body)
	res.json({ status: true })
});

/** Sign JWT
 * @api {post} /sign-jwt Sign JWT Token
 * @apiName Sign JWT
 * @apiGroup Webhook
 *
 *  @apiParam {String} email Email ID of the User.
 * 
 */ //Sign JWT
router.post('/sign-jwt', async (req, res, next) => {
	console.log(chalk.yellow.bold('/sign-jwt'))
	res.json(await controller.signjwt(req.body))
});


/** IP
 * @api {post} /ip Hit the Trigger Action
 * @apiHeader {String} token JWT Token
 * @apiName IP
 * @apiGroup Webhook
 *
 */ //IP
router.post('/ip', authenticate, async (req, res, next) => {
	console.log(chalk.yellow.bold('/ip'))
	res.json(await controller.ip(req))
});


/** Register
 * @api {post} /register Register
 * @apiHeader {String} token JWT Token
 * @apiName Register
 * @apiGroup Webhook
 *
 * @apiParam {String} url Webhook URL 
 */ //Register
router.post('/register', authenticate, async (req, res, next) => {
	console.log(chalk.yellow.bold('/register'))
	res.json(await controller.register(req.body))
})

/** List
 * @api {post} /list List all Webhhooks
 * @apiHeader {String} token JWT Token
 * @apiName List
 * @apiGroup Webhook
 *
 */ //List
router.post('/list', authenticate, async (req, res, next) => {
	console.log(chalk.yellow.bold('/list'))
	res.json(await controller.list())
})

/** Update
 * @api {post} /update Update
 * @apiHeader {String} token JWT Token
 * @apiName Update
 * @apiGroup Webhook
 *
 * @apiParam {String} url Webhook URL 
 * @apiParam {String} id id of Webhook 
 */ //Update
router.post('/update', authenticate, async (req, res, next) => {
	console.log(chalk.yellow.bold('/update'))
	res.json(await controller.update(req.body))
})


/** Delete
 * @api {post} /delete Delete a Webhook
 * @apiHeader {String} token JWT Token
 * @apiName Delete
 * @apiGroup Webhook
 *
 * @apiParam {String} id id of Webhook 
 */ //Delete
router.post('/delete', authenticate, async (req, res, next) => {
	console.log(chalk.yellow.bold('/delete'))
	res.json(await controller.del(req.body))
})


module.exports = router;



