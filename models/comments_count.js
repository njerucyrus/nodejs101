var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

var CommentsCountSchema = new Schema(
    {
        post_id:{
            type: Schema.ObjectId,
            ref: 'Post'
        },
        comment_count: {
            type: Number,
            default:0
        }

    }
);

module.exports = mongoose.model('CommentsCount', CommentsCountSchema);