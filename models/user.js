var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var UserSchema = new Schema(
    {
        first_name: {
            type: String,
            required: true,
            max: 100
        },
        last_name: {
            type: String,
            required: true,
            max: 100
        },
        email: {
            type: String,
            required: true,
            max: 128
        },
        password: {
            type: String,
            required: true,
            max: 128,
            select: false
        },
        joined_on: {
            type:Date,
            default:Date.now()
        }
    }
);

module.exports = mongoose.model('User', UserSchema);