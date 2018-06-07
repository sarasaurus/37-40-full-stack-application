'use strict';

import { Router } from 'express';
import HttpError from 'http-errors';
import bodyParser from 'body-parser';

import Account from '../model/account';
import logger from '../lib/logger';
import basicAuthMiddleware from '../lib/basic-auth-middleware';


const jsonParser = bodyParser.json();
const authRouter = new Router();

authRouter.post('/signup', jsonParser, (request, response, next) => {
  // const options = { runValidators: true, new: true };
  return Account.create(request.body.username, request.body.email, request.body.password)
    .then((account) => {
      delete request.body.password;
      logger.log(logger.INFO,`the ACCOUNT IN SIGNUP ${account}`);
      return account.pCreateToken();
    })
    .then((token) => {
      logger.log(logger.INFO, 'AUTH - returning a 200 code and a token');
      response.cookie('X-Auth-Token', token, { maxAge: 900000 });
      return response.json({ token });
    })
    .catch(next);
});

authRouter.get('/login', basicAuthMiddleware, (request, response, next) => {
  if (!request.account) {
    return next(new HttpError(404, 'AUTH - no resource, now in auth-router'));
  }
  logger.log(logger.INFO,`the ACCOUNT IN LOGIN ${request.account}`);
  return request.account.pCreateToken()
    .then((token) => {
      logger.log(logger.INFO, 'LOGIN - AuthRouter responding with a 200 status and a Token');
      response.cookie('X-Auth-Token', token, { maxAge: 900000 });
      return response.json({ token });
    })
    .catch(next);
});


export default authRouter;

