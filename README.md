# Authorization - Redux
**Author**: Sarah Bixler  
**Version**: 1.0.0  

##Overview
This app uses [React](https://reactjs.org/) and [Redux](https://redux.js.org/) to create the front end routes and UI for a backend database that stores users profiles using [MongoDB](https://www.mongodb.com/)

#### Feature Tasks
* Implement Login/Signup functionality for your mid-term project.
* Use react/redux best practices
* Add reporter and thunk middleware to your redux store
* make async action creators for making ajax requests to your backend
* make sync action creators for updating your app store

#### Components
```
Provider
  App
    AuthRedirect
    Landing
      // handle login and signup
    Dashboard
      // display main app
```

* Implement a Landing route that allows a user to signup and login to the application.
* Manage the frontend routes based on the clients authorization
  * If the user is not logged in they should be forced to remain on the landing route(s)
  * If the user is logged in they should not permitted to remain on the landing route(s)