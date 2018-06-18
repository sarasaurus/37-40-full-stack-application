'use strict';

// account because user is too often a keyword

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';// this does hahs
import crypto from 'crypto'; // this does big string
import jsonWebToken from 'jsonwebtoken';

const HASH_ROUNDS = 8;
const TOKEN_SEED_LENGTH = 128; 

// this info will NEVER BE SENT OUTSIDE!!

const accountSchema = mongoose.Schema({
  passwordHash: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  tokenSeed: {
    type: String,
    required: true,
    unique: true,

  },
  createdOn: {
    type: Date,
    default: () => new Date(),
  },
});
function pVerifyPassword(password) {
  return bcrypt.compare(password, this.passwordHash)
    .then((result) => {
      if (!result) {
        throw new Error('400', 'sneaky sneaky password error AUTH - incorrect data');
      }
      return this; 
    });
}

function pCreateToken() {
  this.tokenSeed = crypto.randomBytes(TOKEN_SEED_LENGTH).toString('hex');
  return this.save()
    .then((account) => {
      return jsonWebToken.sign({ tokenSeed: account.tokenSeed }, process.env.SOUND_CLOUD_SECRET);
    });
}

accountSchema.methods.pCreateToken = pCreateToken;
accountSchema.methods.pVerifyPassword = pVerifyPassword;

const Account = mongoose.model('account', accountSchema);

Account.create = (username, email, password) => {
  return bcrypt.hash(password, HASH_ROUNDS)
    .then((passwordHash) => {
      password = null;
      const tokenSeed = crypto.randomBytes(TOKEN_SEED_LENGTH).toString('hex');
      return new Account({
        username,
        email,
        passwordHash,
        tokenSeed,
      }).save();
    });
};

export default Account;
