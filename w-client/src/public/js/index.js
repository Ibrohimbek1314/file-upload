async function renderImages (userId) {
	const images = await request('/images' + (userId ? ('?userId=' + userId) : '') )

	imagesWrapper.innerHTML = null
	for(let image of images) {
		const [li, img, div, span, a] = createElements('li', 'img', 'div', 'span', 'a')

		img.setAttribute('src', backendApi + image.imageUrl)
		a.setAttribute('href', backendApi + '/download' + image.imageUrl)

		span.textContent = image.imageTitle
		a.textContent = 'download'

		div.append(span, a)
		li.append(img, div)
		imagesWrapper.append(li)
	}
}

async function renderUsers () {
	const users = await request('/users')
	const userId = window.localStorage.getItem('userId')
	for(let user of users) {
		const [a] = createElements('a')

		a.setAttribute('href', '#')
		a.textContent = user.username
		
		usersList.append(a)

		if(user.userId == userId) {
			a.style.backgroundColor = 'blue'
			a.style.color = 'white'
		}

		a.onclick = event => {
			renderImages(user.userId)
		}
	}
}

form.onsubmit = async event => {
	event.preventDefault()

	let formData = new FormData()

	formData.append('image', fileInput.files[0])
	formData.append('title', textInput.value)

	await request('/images', 'POST', formData)
	await renderImages()
}


renderUsers()
renderImages()