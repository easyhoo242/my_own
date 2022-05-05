class Teacher {
	constructor(name, age) {
		this.name = name
		this.age = age
	}
}

class Student extends Teacher {
	constructor(name, age, height = 1.8) {
		super(name, age)
		this.height = height
	}
}

const s = new Student('dc', 18)

console.log(s)
