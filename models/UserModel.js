 var mongoose = require('mongoose');
mongoose.connect('mongodb://testuser:password@ds139899.mlab.com:39899/nodesapisrk');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
var UserSchema = new Schema({
    id    : ObjectId,
    first_name   : String,
    last_name    : String,
    email     : String,
    career     : String


});


var UserModel = mongoose.model('users',UserSchema);
module.exports = UserModel;


