/**
 *  User
 */

const mongoose = require('mongoose')
    , Schema = mongoose.Schema

const UserSchema = new Schema({
    email: { type: String, trim: true, required: true },

    // timestamps
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', UserSchema)