/**
 * Created by nlg on 08/07/2014.
 */

var db = require('./database');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    name:{ type:String, default:''},
    title:{type:String, default:''},
    message:{type:String, default:''},
    comments:[{body: String, date:Date}],
    user:Schema.objectId
});

mongoose.model('post', postSchema);