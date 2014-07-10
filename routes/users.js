var express = require('express');
var router = express.Router();
var app = express();
var User = require('../models/user.js')

/* '/' --> http://localhost:3000/users */

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('user');
});

//http://localhost:3000/users/name
router.get('/:user', function(req, res, next){
    res.render('user', {name: req.params.user});
})


module.exports = router;


/**
 * 注册操作
 * @param req
 * @param res
 * @return {*}
 */
exports.doReg=function(req,res){
    //检验用户两次输入的口令是否一致
    if(req.body["password-repeat"]!=req.body['password']){
        req.session.error="两次输入的口令不一致";
        return res.redirect("/reg");
    }
    //生成口令的散列值，我们使用md5加密
    var md5=crypto.createHash('md5');
    var password=md5.update(req.body.password).digest("base64");
    //声明需要添加的用户
    var newUser=new User({
        name:req.body.username,
        password:password
    });
    User.find(newUser.name,function(err,user){
        //如果用户已经存在
        if(user){
            req.session.error="该用户已经存在";
            return res.redirect("/reg");
        }
        //如果不存在则添加用户
        newUser.save(function(err){
            if(err){
                req.session.error=err;
                return res.redirect("/reg");
            }
            req.session.user=newUser;
            req.session.success="注册成功";
            res.redirect("/");
        })
    })
}