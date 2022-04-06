const _splitLine = () =>
	new Array(30)
		.fill(null)
		.map((res) => '-')
		.join('')

function splitLine() {
	return new Array(30)
		.fill(null)
		.map((res) => '-')
		.join('')
}

console.log(splitLine())
console.log(_splitLine())
