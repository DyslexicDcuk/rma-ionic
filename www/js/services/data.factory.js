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
  const LOCATIONS = 'LOCATIONS';


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

      window.alert('No user with that username and password!');
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
      let locations = JSON.parse(window.localStorage.getItem(LOCATIONS)) || [];
      location.id = (new Date).getTime();
      locations.push(location);
      window.localStorage.setItem(LOCATIONS, JSON.stringify(locations));
    },

    getLocations: (user) => {
      const locations = JSON.parse(window.localStorage.getItem(LOCATIONS)) || [{}];
      let result = [];

      locations.forEach((item) => {
        if (item.owners.includes(user.id)) result.push(item);
      })

      return result;
    },

    getLocationById: (id) => {
      const locations = JSON.parse(window.localStorage.getItem(LOCATIONS)) || [{}];
      let result;
      locations.forEach((item) => {
        if (item.id.toString() == id.toString()) result = item;
      });

      return result;
    },

    saveLocation: (loc) => {
      let locations = JSON.parse(window.localStorage.getItem(LOCATIONS)) || [];

      for (let i=0; i<locations.length; i++) {
        if (locations[i].id == loc.id) locations[i] = loc;
      };

      window.localStorage.setItem(LOCATIONS, JSON.stringify(locations));
    }
  }
})