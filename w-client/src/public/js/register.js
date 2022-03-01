form.onsubmit = async event => {
	try {
		event.preventDefault()

		let newUser = {
			username: usernameInput.value,
			password: passwordInput.value,
			gender: genderInput.value,
				birthdate: dateInput.value
		}
	
		const response = await request('/auth/register', 'POST', newUser)
		messageText.textContent = response.message
		messageText.style.color = 'green'
		window.localStorage.setItem('token', response.token)
		window.localStorage.setItem('userId', response.userId)
		window.location = '/'
		
	} catch(error) {
		messageText.textContent = error.message
	}
}