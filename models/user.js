'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var mongoDB = 'mongodb://127.0.0.1/blog';
mongoose.connect(mongoDB, {
    useMongoClient: true
});

//Get the default connection
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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
UserSchema.methods.comparePassword = function (password) {
   return bcrypt.compare(password, this.password);
};

UserSchema.virtual('full_name').get(function () {
    return this.first_name + " "+ this.last_name;
}).set(function(v) {
    this.__full_name = v;
});


module.exports = mongoose.model('User', UserSchema);