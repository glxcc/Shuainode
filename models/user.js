/**
 * Created by nlg on 08/07/2014.
 */

var db = require('./database');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name:{ type:String, default:'' },
    email: {type:String, default:''},
    username: {type:String, default:''},
    hashed_password : {type:String, default:''}
});

mongoose.model('user', userSchema);
