const express = require('express');
const router = express.Router();
const controller = require('../controllers/index')
const secret = require('../config/secret')
const chalk = require('chalk')
const { authenticate } = require('../middlewares/authenticate')



router.get('/', (req, res, next) => {
	res.json({
		'status': 'healthy'
	})
});


router.post('/sign-jwt', async (req, res, next) => {
	console.log(chalk.yellow.bold('/sign-jwt'))
	res.json(await controller.signjwt(req.body))
});

router.post('/ip', authenticate, async (req, res, next) => {
	console.log(chalk.yellow.bold('/ip'))
	res.json(await controller.ip(req))
});


router.post('/register', authenticate, async (req, res, next) => {
	console.log(chalk.yellow.bold('/register'))
	res.json(await controller.register(req.body))
})


router.post('/list', authenticate, async (req, res, next) => {
	console.log(chalk.yellow.bold('/list'))
	res.json(await controller.list())
})

router.post('/update', authenticate, async (req, res, next) => {
	console.log(chalk.yellow.bold('/update'))
	res.json(await controller.update(req.body))
})

router.post('/delete', authenticate, async (req, res, next) => {
	console.log(chalk.yellow.bold('/delete'))
	res.json(await controller.del(req.body))
})


module.exports = router;



