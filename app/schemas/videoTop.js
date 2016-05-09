var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjcetId = Schema.Types.ObjcetId;

var VideoTopSchema = Schema({

    title: String,
    url: String,
    poster:String,
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
VideoTopSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});

module.exports = VideoTopSchema;
