app

// currentUser = {
//   id: number
// }

// users = [{
//   id: number,
//   name: string,
//   password: string
// }]

// locations = [{
//   id: number,
//   createdBy: number(id),
//   owners: [{ id: number(id) }],
//   latLng: {},
//   title: string,
//   description: string
// }]

.factory('DataFactory', function($rootScope) {
  const USERS = 'USERS';
  const CURRENT_USER = 'CURRENT_USER';

	return {
    login: (credentials) => {
      const users = JSON.parse(window.localStorage.getItem(USERS)) || [];

      if (users.length > 0) {
        for (user of users) {
          if (user.username.toLowerCase() === credentials.username.toLowerCase()
          && user.password === credentials.password) {
            window.localStorage.setItem(CURRENT_USER, JSON.stringify(user));
            return user;
          };
        }
      }

      window.alert('No user with that username and password!')
    },

    logout: () => {
      window.localStorage.removeItem(CURRENT_USER);
    },

    registerUser: (user) => {
      let users = JSON.parse(window.localStorage.getItem(USERS)) || [];

      if (users.length === 0) {
        window.localStorage.setItem(USERS,
          JSON.stringify(
            [Object.assign(user, { id: (new Date()).getTime() })]
          ));
      } else {
        for (u of users) {
          if (u.username.toLowerCase() === user.username.toLowerCase()) {
            window.alert('User with that username already exists!');
            return false;
          }
        }
      }

      users.push(Object.assign(user, { id: (new Date()).getTime() }));

      window.localStorage.setItem(USERS, JSON.stringify(users));
    },

    getCurrentUser: () => {
      return JSON.parse(window.localStorage.getItem(CURRENT_USER));
    },

    addLocation: (location) => {
      console.log(location);
    }
  }
})