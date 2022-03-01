const sha256 = require('sha256')
const jwt = require('jsonwebtoken')

const LOGIN = (req, res) => {
	const { username, password } = req.body
	const users = req.select('users')

	let user = users.find( user => user.username === username && user.password === sha256(password) )

	if(!user) {
		res.status(400).json({ message: "Wrong username or password!" })
	}

	res.status(200).json({
		userId: user.userId,
		message: "The user successfully logged in!",
		token: jwt.sign({ userId: user.userId, agent: req['headers']['user-agent'] }, 'SECRET_KEY')
	})
}

const REGISTER = (req, res) => {
	try {
		const { username, password, birthdate, gender } = req.body
		const users = req.select('users')

		let newUser = {
			userId: users.length ? users[users.length - 1].userId + 1 : 1,
			password: sha256(password),
			username,
			birthdate,
			gender,
		}
		
		users.push(newUser)
		req.insert('users', users)

		res.status(201).json({
			userId: newUser.userId,
			message: "The user successfully registered!",
			token: jwt.sign({ userId: newUser.userId, agent: req['headers']['user-agent'] }, 'SECRET_KEY')
		})

	} catch(error) {
		res.status(404).json({ message: error.message })
	}
}


module.exports = {
	REGISTER,
	LOGIN
}