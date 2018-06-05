# 401 JS --  Lab 37 Full-Stack Auth

## Submission Instructions
  * Work in a fork of this repository
  * Work in a branch on your fork
  * Submit a pull request to this repository
  * Submit a link to your pull request on canvas
  * Submit a question, observation, and how long you spent on canvas  

## Configuration  
#### backend/
* Copy your mid-project into this directory
  * Remove the .git folder from the backend project directory before committing
  
#### frontend/
* Develop your entire front-end under this folder
 
## Feature Tasks 
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

##  Documentation  
Write a description of the project in your README.md
