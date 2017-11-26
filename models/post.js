var mongoose = require('mongoose');

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
            max: 255
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