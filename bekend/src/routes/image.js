const router = require('express').Router()
const imageController = require('../controllers/image.js')

router.route('/')
	.get(imageController.GET)
	.post(imageController.POST)


module.exports = router