'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _express = require('express');

var _httpErrors = require('http-errors');

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _profile = require('../model/profile');

var _profile2 = _interopRequireDefault(_profile);

var _logger = require('../lib/logger');

var _logger2 = _interopRequireDefault(_logger);

var _bearerAuthMiddleware = require('../lib/bearer-auth-middleware');

var _bearerAuthMiddleware2 = _interopRequireDefault(_bearerAuthMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jsonParser = _bodyParser2.default.json();
var profileRouter = new _express.Router();

profileRouter.post('/profiles', _bearerAuthMiddleware2.default, jsonParser, function (request, response, next) {
  console.log('REQUEST PROFILE: ', request.body);
  if (!request.account) {
    return next(new _httpErrors2.default(401, 'AUTH  in POST- profile route invalid req!'));
  }
  return new _profile2.default(_extends({}, request.body, {
    account: request.account._id
  })).save().then(function (profile) {
    _logger2.default.log(_logger2.default.INFO, '200 from new Profile created!');
    console.log(response.json(profile));
    return response.json(profile);
  });
  // .catch(err => console.log('ERROR IN PROFILE,', err));
});
profileRouter.get('/profiles/me', _bearerAuthMiddleware2.default, function (request, response, next) {
  console.log('REQUEST IN GET', request);
  _profile2.default.findOne({ account: request.account._id }).then(function (profile) {
    if (!profile) {
      return next(new _httpErrors2.default(404, 'NOT FOUND ERROR: profile not found'));
    }
    return response.json(profile);
  }).catch(next);
});
profileRouter.put('/profiles/:id', _bearerAuthMiddleware2.default, jsonParser, function (request, response, next) {
  console.log('REQUEST IN PUT', request.body);
  _profile2.default.findByIdAndUpdate(request.body._id, request.body, { new: true }).then(function (profile) {
    if (!profile) {
      return next(new _httpErrors2.default(400, 'AUTH  in PUT- profile route invalid req!'));
    }
    _logger2.default.log(_logger2.default.INFO, '200 in profile, PUT route! PRoFILE? ' + profile);
    return response.json(profile);
  }).catch(next);
});

// profileRouter.get('/profiles/:id', (request, response, next) => {
//   if (!request.body._id) {
//     return next(new HttpError(400, 'AUTH in GET - no id!'));
//   }
//   return Profile.findById(request.body._id)
//     .then((profile) => {
//       if (!profile) {
//         return next(new HttpError(400, 'AUTH  in GET- profile route invalid req!'));
//       }
//       logger.log(logger.INFO, '200 in profile, GET route!');
//       return response.profile;
//     })
//     .catch(next);
// });

exports.default = profileRouter;