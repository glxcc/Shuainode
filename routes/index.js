var express = require('express');
var router = express.Router();
var app = express();
// apply the routes to our application
app.use('/', router);

/* GET home page. */
router.get('/', function(req, res) {
  //res.render('index', { title: 'Shuai ge page' });
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


/*router.use('/login', function(req, res, next){
    res.render('login', {title: 'login'})
})*/


router.get('/u/:user', function(req, res, next){
    res.render('user', {title: req.params.user})
})

router.get('/reg', function(req, res, next){
    res.render('reg', {title: 'register'})
})

router.get('/logout', function(req, res, next){
    res.render('login',{title: 'you have logged out'})
})

// apply the routes to our application
app.use('/', router);

app.route('/login')
    // show the form (GET http://localhost:8080/login)
    .get(function(req, res) {
        res.render('login', {title: 'login'})
    })

    // process the form (POST http://localhost:8080/login)
    .post(function(req, res) {
        console.log('processing');
        res.send('processing the login form!');
    });

module.exports = router;
