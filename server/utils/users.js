[{
  id: '874nyd1',
  name: 'Andrew',
  room: 'The Office Fans'
}]

// addUser(id, name, room)
// removeUSer(id)
// getUser(id)
// getUserList(room)

// ES6 classes

/* class Person {
  constructor (name, age) {
    this.name = name;
    this.age = age;
  }

  getUserDescription() {
    return `${this.name} is ${this.age} years old`;
  }
}

var me = new Person('Andrew', 25);
console.log("me.name", me.name);
console.log("me.age", me.age);

var desc = me.getUserDescription();
console.log(desc); */

class Users {
  constructor () {
    this.users = [];
  }

  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser (id) {
    // return user that was removed
    var user = this.getUser(id);

    if(user) {
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
  }

  getUser (id) {
   var users = this.users.filter((user) => {
     return user.id === id;
   });

   return users[0];
  }

  getUserList (room) {
    var users = this.users.filter((user)=>{
      return user.room === room;
    });

    var namesArray = users.map((user) => {
      return user.name;
    });

    return namesArray;
  }
}

module.exports = {Users};