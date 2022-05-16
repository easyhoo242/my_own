const data = {
	name: 'sjj',
}

const getData = () => {
	return new Promise((resolve) => {
		resolve(data)
	})
}

export { getData }
