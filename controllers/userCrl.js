/**
 * Created by nlg on 09/07/2014.
 */

var mongoose = require('mongoose')
    , User = mongoose.model('User')
    , utils = require('../../lib/utils')

var login = function(req, res){
    var redirectTo = res.session.returnTo? req.session.returnTo : '/';

}

/**
 * Create user
 */

exports.create = function (req, res) {
    var user = new User(req.body)
    user.provider = 'local'
    user.save(function (err) {
        if (err) {
            return res.render('users/signup', {
                error: utils.errors(err.errors),
                user: user,
                title: 'Sign up'
            })
        }

        // manually login the user once successfully signed up
        req.logIn(user, function(err) {
            if (err) return next(err)
            return res.redirect('/')
        })
    })
}

/**
 *  Show profile
 */

exports.show = function (req, res) {
    var user = req.profile
    res.render('users/show', {
        title: user.name,
        user: user
    })
}

/**
 * Find user by id
 */

exports.user = function (req, res, next, id) {
    User
        .findOne({ _id : id })
        .exec(function (err, user) {
            if (err) return next(err)
            if (!user) return next(new Error('Failed to load User ' + id))
            req.profile = user
            next()
        })
}
