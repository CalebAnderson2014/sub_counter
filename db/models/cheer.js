const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const UserModel = require('./user.js');
const ChannelModel = require('./channel.js');


const cheerSchema = new mongoose.Schema({
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Channel'
  },
  amount: { type: Number },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: String
}, { timestamps: true });

const CheerModel = mongoose.model('Cheer', cheerSchema);


module.exports = CheerModel;
