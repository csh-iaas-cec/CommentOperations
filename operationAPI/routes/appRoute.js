'use strict';
module.exports = function(app){

    var io = require('../controller/IOController');
    
    console.log("routing to the api")

    app.route('/api/getList')
        .get(io.getListOfUsers);
    
    app.route('/api/getEn/:currentUser')
        .get(io.getEnOfUsers);

    app.route('/api/postComment')
        .post(io.postComment);
    
}