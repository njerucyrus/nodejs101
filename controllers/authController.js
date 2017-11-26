
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');


exports.authenticate = function (req, res) {
    User.findOne({'email': req.body.email}, function (err, user) {
        if (err)
            res.status(500).json({message:err});
        if (!user){
            res.status(401).json({message: "Authentication failed Invalid email/password"});
        }else if(user){
            if (!user.comparePassword(req.body.password)){
                res.status(401).json({message: "Authentication failed Invalid email/password"})
            }else{
                res.json({token: jwt.sign({ email: user.email, full_name: user.__full_name, _id: user._id}, 'BLOG_POST_KEY')});

            }
        }

    })
};

exports.loginRequired = function(req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};