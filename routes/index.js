var express = require('express');
var router = express.Router();

var UserDao=require('../models/user');

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

router.get('/login', function(req, res, next){
    res.render('login',{title: 'login GET page'})
});

router.post('/login', function(req, res, next){

    console.log(req.param.username);
    res.render('login',{title: 'login POST page', username:req.body.username})
})

// login routes
/*app.route('/login').get(function(req, res) {
    // show the form (GET http://localhost:8080/login)
    console.lon("login called");
    res.render('login',{title: 'this is login page'})

}).post(function(req, res) {

    // process the form (POST http://localhost:8080/login)
    console.log('processing');
    res.send('processing the login form!');

});*/

router.get('/reg', function(req, res, next){
    res.render('reg', {title: 'register'})
})

router.post('/reg', function(req , res, next){

    var username = req.body.username;
    var password = req.body.password;



    var regUser = {
        username : req.body.username,
        password : req.body.password
    };
    //regUser.username = req.body.username;
   // regUser.password = req.body.password;

    //var UserDao = Models.UserDao;

    console.log(module.export);
    console.log(UserDao);

    UserDao.save(regUser, function(){
        console.log('saved');
        res.render('login',{title: 'sssssss'})
    });

})

/**
 * 退出操作
 * @param req
 * @param res
 */
router.get('/logout', function(req, res, next){
    res.render('login',{title: 'you have logged out'})
})

module.exports = router;



exports.user=function(req,res){
    User.find(req.params.user,function(err,user){
        if(!user){
            req.session.error="用户不存在";
            return res.redirect("/");
        }
        Post.find(user.name,function(err,posts){
            if(err){
                req.session.error=err;
                return req.redirect("/");
            }
            res.render("user",{
                title:user.name,
                posts:posts
            })
        });
    });
}

exports.post=function(req,res){
    var currentUser=req.session.user;
    var post=new Post(currentUser.name,req.body.post);
    post.save(function(err){
        if(err){
            req.session.error=err;
            return res.redirect("/");
        }
        req.session.success="发表成功";
        res.redirect("/u/"+currentUser.name);
    });
}

/**
 * 登录操作
 * @param req
 * @param res
 */
exports.doLogin=function(req,res){
    //将登录的密码转成md5形式
    var md5=crypto.createHash("md5");
    var password=md5.update(req.body.password).digest("base64");
    //验证用户
    User.find(req.body.username,function(err,user){
        //首先根据用户名查询是否存在
        if(!user){
            req.session.error="用户不存在";
            return res.redirect("/login");
        }
        //验证密码是否正确
        if(user.password!=password){
            req.session.error="用户密码错误";
            return res.redirect("/login");
        }
        req.session.user=user;
        req.session.success="登录成功";
        res.redirect("/");
    })
}


