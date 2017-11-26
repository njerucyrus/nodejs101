var Comment = require('../models/comment');


exports.comment_list = function (req, res) {
    Comment.find({post_id: req.params.post_id}, function (err, comments) {
        if (err) throw err;
        if (comments !== null) {
            res.json(comments)
        }
        else {
            res.json({status: "error", message: "No comments"})
        }
    }).populate('post_id').populate('comment_by').exec();
};

exports.comment_detail = function (req, res) {
    Comment.findById(req.params.id(), function (err, comment) {
        if (err)
            throw err;
        if (comment)
            res.json(comment);
        else
            res.json({status: "error", message: "Comment not found"})
    })
};

exports.comment_create = function (req, res) {
    var comment_by = null;
    Comment.findOne({'comment_by': comment_by, 'post_id': req.params.post_id}, function (err, comment) {
        if (err)
            throw err;
        if (comment !== null)
            res.json({status: "error", message: "you have already commented on this post.", data: comment})
        else
            Comment.create(req.body, function (err) {
                if (err)
                    throw err;
                res.json({status: "success", message: "Comment created"})

            });
    })
};

exports.comment_update = function (req, res) {
    Comment.findById(req.params.id, function (err, comment) {
        if (err)
            throw err;
        if (comment) {
            comment.comment_text = req.body.comment_text;
            comment.save(function (err) {
                if (err)
                    throw err
                res.json({status: "success", message: "Comment updated"});
            })
        }
    });
};

exports.comment_delete = function (req, res) {
    Comment.findById(res.params.id, function (err, comment) {
        if (err)
            throw err
        if (comment) {
            comment.remove();
            res.json({status: "success", message: "comment deleted"});
        } else {
            res.json({status: "error", message: "failed to retrieve the comment"});
        }

    })
};