const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const chatSchema = new Schema({
  senderId: { type: Mongoose.Schema.ObjectId, ref: 'staff' },
  receiverId: { type: Mongoose.Schema.ObjectId, ref: 'staff' },
  company: { type: Mongoose.Schema.ObjectId, ref: 'company', index: true },
  message: String,
  sendTime: Number,
  receiveTime: Number,
  delivered: { type: Boolean, default: false },
  senderDelete: { type: Boolean, default: false },
  receiverDelete: { type: Boolean, default: false },
  isStar: { type: Boolean, default: false },
  seen: { type: Boolean, default: false },
  seenTime: Number,
  messageType: String,
  dataPath: {
    url: { type: String, default: '' },
    name: { type: String, default: '' },
    size: { type: Number, default: 0 },
  },
});

const chatModel = Mongoose.model('chat', chatSchema);

module.exports = chatModel;
