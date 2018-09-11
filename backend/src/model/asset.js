'use strict';

import mongoose from 'mongoose';

const assetSchema = mongoose.Schema({
  title: { 
    type: String,
  },
  url: { 
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: () => new Date(), 
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

export default mongoose.model('asset', assetSchema);
