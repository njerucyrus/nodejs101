var Post = require('../models/post');

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
    })
};

exports.post_detail = function (req, res) {
    Post.findById(req.params.id, function (err, post) {

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
    });
};

exports.post_create = function (req, res) {
    Post.findOne({'title': req.body.title, 'body': req.body.body}, function (err, post) {
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
            Post.create(req.body, function (err) {
               if(err)
                   throw err;
                res.json({status: {
                    message: "Post Created Successfully",
                    statusCode: res.statusCode
                }})
            })
        }
    })
};

exports.post_update = function (req, res) {
 Post.findById(req.params.id, function (err, post) {
     if (err){
        throw err;
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
Post.findById(req.params.id, function (err, post) {
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