var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var CommentSchema = new Schema(
    {
        post_id: {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        },
        comment_by: {
            type:Schema.Types.ObjectId,
            ref: 'User'
        },
        comment_text: {
            type: String,
            required: true,
            max:100
        },
        commented_on: {
            type:Date,
            default:Date.now()
        }
    }
);


module.exports = mongoose.model('Comment', CommentSchema);