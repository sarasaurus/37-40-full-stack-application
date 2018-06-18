# Profile Creation
**Author**: Sarah Bixler  
**Version**: 1.0.0  

##Overview
This app uses [React](https://reactjs.org/) and [Redux](https://redux.js.org/) to create the front end routes and UI for a backend database that stores users profiles using [MongoDB](https://www.mongodb.com/)


## Getting Started
- fork the repo
- install packages in both front and backend folders using `npm i`
- create a `.env` file in the **frontend** folder
```
NODE_ENV = development
PORT = 3000
CDN_URL=/
API_URL=http://localhost:3000
```
- create a `.env` file in the **backend** folder:
```
SOUND_CLOUD_SECRET = HynUc0hndJu1i0FjnUM9976KLMXHCffSXDYST9BYGhfIFjFvSJxeMXfRbyblMQpfStx5gXZew3r2YX1kmCay2NNpR2mM4ujzsZoq
NODE_ENV = development
PORT = 3000
MONGODB_URI=mongodb://localhost/nameofdb
CORS_ORIGIN=http://localhost:8080
```
## Architecture

[MongoDB](https://www.mongodb.com/) | [Node](https://node.js.org/) 
[React](https://reactjs.org/) | [Express](https://expressjs.org) 
[Redux](https://redux.js.org/) | [Webpack](http://www.webpack.com)
[Jest]() |  [Babel]() 
[Superagent]() |
CSS3 with [SASS]()
[Eslint]() with [AirBnb]() stye guide

## Changelog
06-17-2018 -- Login component and profile form implemented client side 