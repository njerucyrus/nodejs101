var Post = require('../models/post');
var fileUpload = require('express-fileupload');
var path = require('path');

exports.post_list = function (req, res) {
    Post.find({}, function (err, posts) {
        if (err) {
            throw err;
        }
        if (posts !== null) {
            res.json(posts);
        } else {
            res.json({
                error: {
                    message: "No posts "
                }
            })
        }
    }).populate('posted_by');
};

exports.post_detail = function (req, res) {
    Post.findById(req.params.id, function(err, post){

        if(err){
          throw err;
        }
        if (post !== null){
            res.json(post);
        }else{
            res.json({
                error: {
                    message: "No post found"
                }
            })
        }
    }).populate('posted_by');
};

exports.post_create = function (req, res) {
    var query = {
        'title': req.body.title,
        'body': req.body.body,
        posted_by: req.user._id
    };
    Post.findOne(query, function (err, post) {
        if(err){
            throw err;
        }
        if(post !==null){
            res.json({
                status: {

                    message: "Post Already exists"

                }
            });
        }else{
            if (!req.files) {
                Post.create(req.body, function (err) {
                    if (err)
                        throw err;
                    res.json({
                        status: {
                            message: "Post Created Successfully",
                            statusCode: res.statusCode
                        }
                    })
                })
            }else{
                var imageFile = req.files.image;
                var extension = path.extname(imageFile.name);
                var allowedExtesions = ['.png', '.jpeg', '.gif', '.jpg'];
                if (allowedExtesions.includes(extension)){
                    imageFile.mv(__dirname+'../public/uploads'+imageFile.name, function (err) {
                        if (err){
                            res.status(500).json({message:err});
                        }
                        var post = new Post(req.body);
                        post.image_url = 'uploads/'+imageFile.name;
                        post.save(function (err) {
                            if (err){
                                res.status(500).json({message: err})
                            }
                            res.json({status: "success", message:"Post Created successfully"});

                        });

                    })
                }else{
                    res.status(500).json({status:"error", message: "only images allowed"});
                }

            }

        }
    })
};

exports.post_update = function (req, res) {
 Post.findOne({_id:req.params.id, posted_by:req.user._id}, function (err, post) {
     if (err){
        res.status(500).json({message:err});
     }
     if (post !== null){
         post.title = req.body.title;
         post.body = req.body.body;
         post.updated_at = Date.now();
         post.save(function (err) {
           if (err) throw err;
           res.json({
               message: "Post Updated Successfully",
               statusCode: res.statusCode
           });
         })
     }
 });
};

exports.post_delete = function (req, res) {
Post.findOne({_id:req.params.id, posted_by:req.user._id}, function (err, post) {
    if(err) throw err;
    if (post){
        post.remove();
        res.json("Post Deleted");
    }else{
        res.json({error: {
            message: "Post does not exist"
        }})
    }
})
};