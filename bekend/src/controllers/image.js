const path = require('path')

const GET = (req, res) => {
	const { userId } = req.query
	const files = req.select('files')
	if(userId) {
		res.status(200).json(
			files.filter(file => file.userId == userId)
		)
	} else {
		res.status(200).json(files)
	}
}

const POST = (req, res) => {
	try {
		const { image } = req.files
		const { title } = req.body
		
		const imageName = (Date.now() % 1000) + image.name.replace(/\s/g, '')

		image.mv( path.join(process.cwd(), 'src', 'files', imageName) )

		const newImage = {
			imageUrl: '/data/files/' + imageName,
			imageTitle: title,
			userId: req.userId
		}

		const files = req.select('files')
		files.push(newImage)
		req.insert('files', files)

		return res.status(201).json({ message: "OK" })

	} catch(error) {
		return res.status(400).json({ message: error.message })
	}
}

module.exports = {
	POST,
	GET
}