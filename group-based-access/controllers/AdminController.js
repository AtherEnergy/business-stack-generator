/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var async = require('async');

module.exports = {
    
    list: function (req, res) {
        async.auto({
			userList: function(cb){
				User.find().populate('groups').exec(function(err, users){
					if(err) return cb(err);
					return cb(null, users);
				})
			},
			groupList: ['userList',function(results, cb){
				Group.find().sort('id ASC').populate('users').exec(function (err, groups) {
                    if (err) {
                        return cb(err);
                    }
                    return cb(null, groups);
                })
			}],
		}, function(err, results){
            res.view(`.${req.originalUrl}/list`, { groups: results.groupList , users:results.userList })
        })
    },
    create_group: function (req, res) {
        Group.create(req.body).exec(function (err, group) {
			if (err) return res.serverError(err);
			res.redirect('/groups')
        })
    },
    create_user: function (req, res) {
        User.create(req.body).exec(function (err, user) {
			if (err) return res.serverError(err);
			res.redirect('/users')
        })
    },

}