var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjcetId = Schema.Types.ObjcetId;

var VideoSchema = Schema({
    top: [{
        title:String,
        url: String}
        ],
    right: {
    	title:String,
        poster: String,
        content:[{
        	title:String,
        	url:String
        }],
        meta: {
            createAt: {
                type: Date,
                default: Date.now()
            },
            updateAt: {
                type: Date,
                default: Date.now()
            }
        }
    },
    bottom: {
        title: String,
        content: [{
            title: String,
            url: String,
            poster: String,
            plays: Number,
            comments: Number,
            

        }],
        meta: {
            createAt: {
                type: Date,
                default: Date.now()
            },
            updateAt: {
                type: Date,
                default: Date.now()
            }
        }
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});
VideoSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});

module.exports = VideoSchema;
