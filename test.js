function Person(name) {
  var a = new Object();
  a.name = name;
  a.say = function () {
    console.log(this.name)
  }
  a.__proto__ = Person.prototype;

  return a;
};

let a = new Person('a');
console.log(a.__proto__)
a.say();