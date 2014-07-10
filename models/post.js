/**
 * Created by nlg on 08/07/2014.
 */

var mongodb = require('./database');
var Schema = mongodb.mongoose.Schema;

var postSchema = new Schema({
    name:{ type:String, default:''},
    title:{type:String, default:''},
    message:{type:String, default:''},
    comments:[{body: String, date:Date}],
    User:Schema.ObjectId
});

var Post = mongodb.mongoose.model('post', postSchema);

var PostDAO = function(){};
module.exports = new PostDAO();
