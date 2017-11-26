var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var LikesSchema = new Schema(
    {
        post_id: {
            type: Schema.ObjectId,
            ref: 'Post'
        },
        likes_count: {
            type: Number,
            default: 0
        }
    }
);

module.exports = mongoose.model('Likes', LikesSchema);