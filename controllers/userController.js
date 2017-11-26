var User = require('../models/user');

exports.user_list = function (req, res) {
    res.send("NOT implemented : UserList");
};

exports.user_detail = function (req, res) {
    res.send("NOT implemented : Detail"+req.params.id);
};

exports.user_create = function (req, res) {
    var user = req.body;
    User.create(user, function (err, user) {
        if (err){
            throw err
        }
        req.json(user);
    });

};

exports.user_update = function (req, res) {

};

exports.user_delete = function (req, res) {

};