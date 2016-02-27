// var person = {
// 	name: 'Steve',
// 	age: 21
// };


// function updatePerson (obj) {
// 	// obj = {
// 	// 	name: 'Steve',
// 	// 	age: 52
// 	// };

// 	obj.age = 52;
// }



// updatePerson(person);
// console.log(person);

// Array Example

ArrayOne = [15, 24];

function updateArray (arrayObj) {
	// arrayObj = [12, 24, 36];
	var newVal = 36;

	arrayObj.push(newVal);
}

updateArray(ArrayOne);
console.log(ArrayOne);