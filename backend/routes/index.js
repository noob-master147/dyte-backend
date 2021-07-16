const express = require('express');
const router = express.Router();
const controller = require('../controllers/index')
const secret = require('../config/secret')
const chalk = require('chalk')



router.get('/', (req, res, next) => {
	res.json({
		'status': 'healthy'
	})
});



router.post('/trigger', async (req, res, next) => {
	console.log("\n\n",req.body,"\n\n")
	res.json({ status: true })
});

router.post('/ip', async (req, res, next) => {
	console.log(chalk.yellow.bold('/ip'))
	res.json(await controller.ip(req))
});


router.post('/register', async (req, res, next) => {
	console.log(chalk.yellow.bold('/register'))
	res.json(await controller.register(req.body))
})


router.post('/list', async (req, res, next) => {
	console.log(chalk.yellow.bold('/list'))
	res.json(await controller.list())
})

router.post('/update', async (req, res, next) => {
	console.log(chalk.yellow.bold('/update'))
	res.json(await controller.update(req.body))
})

router.post('/delete', async (req, res, next) => {
	console.log(chalk.yellow.bold('/delete'))
	res.json(await controller.del(req.body))
})


module.exports = router;



