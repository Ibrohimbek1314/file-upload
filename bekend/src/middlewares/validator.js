const registerValidator = (req, res, next) => {
	try {
		const { username, password, birthdate, gender } = req.body
		const dateRegEx = /^\d{4}-(02-(0[1-9]|[12][0-9])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))$/

		if(!username) throw new Error("username is required!")
		if(!password) throw new Error("password is required!")
		if(!birthdate) throw new Error("birthdate is required!")
		if(!gender) throw new Error("gender is required!")

		if(typeof(username) !== 'string' || username.length < 2 || username.length > 50) {
			throw new Error("Invalid username!")
		}

		if (
			password.length < 4 || 
			password.length > 16 ||
			!(/[A-Za-z]/).test(password) ||
			!(/[0-9]/).test(password)
		) {
			throw new Error("Invalid password!")
		}

		if(!dateRegEx.test(birthdate)) {
			throw new Error("Invalid birthdate!")
		}

		if(!(+gender == 1 || +gender == 2)) {
			throw new Error("Invalid gender!")
		}

		return next()
		
	} catch(error) {
		res.status(400).json({ message: error.message })
	}
}

const loginValidator = (req, res, next) => {
	try {
		const { username, password } = req.body

		if(!username) throw new Error("username is required!")
		if(!password) throw new Error("password is required!")

		return next()
	} catch(error) {
		res.status(400).json({ message: error.message })
	}
}


module.exports = {
	registerValidator,
	loginValidator,
}