var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

var mongoDB = 'mongodb://127.0.0.1/blog';
mongoose.connect(mongoDB, {
    useMongoClient: true
});

//Get the default connection
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));


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