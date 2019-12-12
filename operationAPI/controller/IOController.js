'use strict';

const IOService = require('../services/io.service');

exports.getListOfUsers = function(req,res,next){
    var io = new IOService();
    io.getListOfUsers(req,function(err,result){
        if(err){
            return next(err);
        }else{
            console.log("result of mem: ", result)
            res.send(result);
        }
    });
}
exports.getEnOfUsers = function(req,res,next){
    var io = new IOService();
    io.getEnDetails(req.params,function(err,result){
        if(err){
            return next(err);
        }else{
            //console.log("result of mem: ", result)
            res.send(result);
        }
    });
}
exports.postComment = function(req,res,next){
    console.log("posting comment")
    var io = new IOService();
    io.postComment(req.body,function(err,result){
        if(err){
            return next(err);
        }else{
            //console.log("result of mem: ", result)
            res.send(result);
        }
    });
}