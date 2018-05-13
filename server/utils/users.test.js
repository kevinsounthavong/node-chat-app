const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
        id: '1',
        name: 'Mike',
        room: 'Node Course'
      },
      {
        id: '2',
        name: 'Jenny',
        room: 'React Course'
      },
      {
        id: '3',
        name: 'Jules',
        room: 'Node Course'
      }
    ];
  });

  it('should add new user', ()=> {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Andrew',
      room: 'The Office Fans'
    };

    var resUser = users.addUser(user.id, user.name, user.room);

    // expect users array to be an array with one item
    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    var userID = '1';

    var user = users.removeUser(userID);

    expect(user.id).toBe(user.id);
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    var userID = '4';

    var user = users.removeUser(userID);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    var userID = '1';

    var user = users.getUser(userID);

    expect(user.id).toBe(userID);
  });

  it('should not find user', () => {
    var userID = '4';

    var user = users.getUser(userID);

    expect(user).toNotExist();
  });

  it('should return names for node course', () => {
    var userList = users.getUserList('Node Course');

    expect(userList).toEqual(['Mike', 'Jules']);

  });

  it('should return names for react course', () => {
    var userList = users.getUserList('React Course');

    expect(userList).toEqual(['Jenny']);

  });
});