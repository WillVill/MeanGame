var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    local           : {
        username    : String,
        email       : String,
        password    : String
    },
    facebook        : {
        id          : String,
        toke        : String,
        email       : String,
        name        : String
    },
    twitter         : {
        id          : String,
        token       : String,
        displayName : String,
        username    : String
    },
    google          : {
        id          : String,
        token       : String,
        email       : String,
        name        : String
    }
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
}

var User = mongoose.model('User', userSchema);

module.exports = User;