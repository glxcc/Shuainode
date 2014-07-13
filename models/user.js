/**
 * Created by nlg on 08/07/2014.
 */

var mongodb = require('./database');
var Schema = mongodb.mongoose.Schema;

var userSchema = new Schema({
    name:{ type:String, default:'' },
    email: {type:String, default:''},
    username: {type:String, default:''},
    hashed_password : {type:String, default:''}
});

userSchema.method.addUser = function(req, res){
    if(req.param.name){
        res.render('user', {
            name:req.param.name,
            email:req.param.email,
            username: req.param.username
        })
    }else{
        return res.render('wrong user format');
    }
}

var User = mongodb.mongoose.model('User', userSchema);

var UserDAO = function(){};

UserDAO.prototype.save = function(obj, callback){
    var newUser = new User(obj);
    newUser.save(function(err){
        callback(err);
    })
}


exports.UserDao = new UserDAO();
