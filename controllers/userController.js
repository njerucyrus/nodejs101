'use strict';
var User = require('../models/user');
var bcrypt = require('bcrypt');


exports.user_list = function (req, res) {
    User.find({}, function (err, users) {
        if (err) {
            res.json(err)
        }
        res.json(users);
    })
};

exports.user_detail = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) throw err;
        if (user !== null) {
            res.json(user);
        }
        else {
            res.json({
                error: {
                    message: "no matching user found"
                }
            });
        }
    })
};

exports.user_create = function (req, res) {


    //var user = req.body;
    User.findOne({'email': req.body.email}, function (err, user) {
        if (err){
            res.status(500).json({message: err})
        }
        if (user) {
            res.status(500).json({message: "User already exists"});
        } else {
            var userObj = new User(req.body);
            userObj.password = bcrypt.hashSync(req.body.password, 10);
            userObj.save(function (err, user) {
                if (err){
                    res.status(500).json({message: err});
                }
                res.status(200).json({message: "User account created"});
            });
        }
    });

    //check if user exists create the user if otherwise


};

exports.user_update = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            throw err;
        } else {
            user.email = req.body.email;
            user.first_name = req.body.first_name;
            user.last_name = req.body.last_name;
            user.save(function (err, instance) {
                if (err) throw err;
                res.json(instance)
            });
        }
    })

};

exports.user_delete = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) throw err;

        if (user) {
            user.remove();
            res.json({message: 'User Deleted'});
        } else {
            res.json({
                error: {
                    message: "could not find user with id: " + req.params.id
                }
            });
        }


    })
};

