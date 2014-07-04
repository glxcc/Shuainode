var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res) {
  //res.render('index', { title: 'Shuai ge page' });
    //mongoose.connect('mongodb://localhost/test');
    mongoose.connect('localhost', 'test', { server: { poolSize: 2 }})

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
        console.log('mongo db connected')
    });

    res.locals = {
        title: 'shuai'
    };
    return res.render(
        'index',
        {
            partials:
            {
                part: 'part'
            }
        }
    );
});

router.use('/login', function(req, res, next){
    res.render('login', {title: 'login'})
})

router.get('/u/:user', function(req, res, next){
    res.render('user', {title: req.params.user})
})

router.get('/reg', function(req, res, next){
    res.render('reg', {title: 'register'})
})

router.get('/logout', function(req, res, next){
    res.render('login',{title: 'you have logged out'})
})


module.exports = router;
