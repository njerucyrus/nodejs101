var mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/blog';
mongoose.connect(mongoDB, {
    useMongoClient: true
});

//Get the default connection
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var Schema = mongoose.Schema;

var PostSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            max: 100
        },

        body: {
            type:String,
            required: true,
            max: 140
        },
        image_url:{
            type: String,
            required: false,
            max: 255,
            default: ""
        },

        posted_by: {
            type:Schema.Types.ObjectId,
            ref: 'User'
        },
        posted_on: {
            type: Date,
            default: Date.now()
        },
        updated_at: {
            type:Date,
            default: Date.now()
        }
    }
);
module.exports = mongoose.model('Post', PostSchema);