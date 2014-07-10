/**
 * Created by nlg on 08/07/2014.
 */

var mongoose = require('mongoose');
mongoose.connect('localhost', 'mongodata', { server: { poolSize: 2 }})

exports.mongoose = mongoose;

/*
 var db = mongoose.connection;

 db.on('error', console.error.bind(console, 'connection error:'));
 db.once('open', function callback () {
 console.log('mongo db connected')
 });
 */
