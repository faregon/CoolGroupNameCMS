var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var service = require('../services/auth.service');
var userService = require('../services/user.service');

/* GET users listing. */
router.get('/', function(req, res, next) {
    User.find(function (err, results){res.json(results);});
});
/*Create user*/
router.route('/').post(function(req, res){

    //checking for errors
    if( typeof req.body.username ==="undefined" || typeof req.body.password === "undefined"){
        //return error
        res.json({message: "Error"})
    }
    
    else { //if values are valid
        userService.createUser(req.body, function(response){
            console.log(response);
            if(response.success) {
                res.json(response.data)
            }
            else {
                res.json({message: response.message});
            }
        });
    }
});

/*Get User */
router.get('/:userid', function(req,res, next){
    var userid = req.params.userid;
    User.findOne({_id:userid}, function(err, results){res.json(results);});
});
/*Update user*/

router.put('/:userid', function(req,res,next){

    userService.updateUser(req.params.userid, req.body, function(response){
        console.log(response);
        if(response.success) {
            res.send(response.data);
        } else {
            res.json({message: response.message});
        }
    });
});

/*Delete user*/
router.delete('/:userid', function(req,res,next){
    var userid = req.params.userid;
    User.remove({_id:userid}, function (err){
            if(err)res.json({message:"Error"});
        }
    );
});

module.exports = router;
