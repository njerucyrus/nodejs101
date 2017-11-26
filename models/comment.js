var mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1/blog';
mongoose.connect(mongoDB, {
    useMongoClient: true
});

//Get the default connection
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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