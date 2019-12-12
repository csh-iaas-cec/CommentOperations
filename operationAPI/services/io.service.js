'use strict';
const Connection = require('../db');
var moment = require('moment');


class IOService{

    getListOfUsers(req,callback){

        console.log('<----------API Database Get List of Users ---------->')

        //let connection = mysql.createConnection(config);
        var connection = new Connection();
        var members = [];
        connection.databaseConnection(null, function(err, data) {
            if (err) {
                logger.error(JSON.stringify(err));
                //callback(boom.badImplementation(err));
                return;
            } else {
                     let Details = `select DISTINCT TeamMember from ENGAGEMENT_DETAILS;`;
                    //console.log("query:", Details)
                     data.query(Details, true, (error, results, fields) => {
                         if (error) {
                             return console.error('<---------- Error : Error occured while connecting to database and error essage is ---------->\n', error.message);
                         }
                         else {
                            results.forEach(element => {
                                members.push(element)
                            });
                             
                            // console.log('<---------- Success : Successfully fetched member details:  ---------->\n', members);
                             
                             callback(null, members);
                         }
                     });
                    }
            });
    }
    getEnDetails(user,callback){
       // console.log("value:",user);
        var connection = new Connection();
        var members = [];
        connection.databaseConnection(null, function(err, data) {
            if (err) {
                logger.error(JSON.stringify(err));
                //callback(boom.badImplementation(err));
                return;
            } else {
                    if(user.currentUser == "Subramanian Viswanathan"){
                        let Details = `Select e.SRNumber,e.SRTitle,e.TeamMember,s.OpportunityID,s.CustomerName,s.RevenueType,ec.comment,ec.DateUpdated
                        FROM ENGAGEMENT_DETAILS e, SR_DETAILS s,ENGAGEMENT_COMMENTS ec
                        where e.SRNumber = s.SRNumber And e.SRNumber = ec.SRNumber And e.TeamMember = ec.Name
                        Order by e.SRNumber;`;
                        //var values = [user.currentUser]
                        // console.log("query:", Details)
                         // console.log("values",values);
                     data.query(Details,true , function(error, results) {
                         if (error) {
                             return console.error('<---------- Error : Error occured while connecting to database and error essage is ---------->\n', error.message);
                         }
                         else {
                            results.forEach(element => {
                                members.push(element)
                            });
                             
                             //console.log('<---------- Success : Successfully fetched member details:  ---------->\n', members);
                             
                             callback(null, members);
                         }
                     });
                    }
                    else{
                        let Details = `Select e.SRNumber,e.SRTitle,s.OpportunityID,s.CustomerName,e.ReportedHours,s.\`OptyOwner(L4)\` as OO
                        FROM ENGAGEMENT_DETAILS e, SR_DETAILS s,
                        where e.TeamMember=?  AND e.SRNumber = s.SRNumber;`;
                        var values = [user.currentUser]
                        // console.log("query:", Details)
                        // console.log("values",values);
                     data.query(Details,values , function(error, results) {
                         if (error) {
                             return console.error('<---------- Error : Error occured while connecting to database and error essage is ---------->\n', error.message);
                         }
                         else {
                            results.forEach(element => {
                                members.push(element)
                            });
                             
                             //console.log('<---------- Success : Successfully fetched member details:  ---------->\n', members);
                             
                             callback(null, members);
                         }
                     });
                    }
                     
                    }
            });
    }

    postComment(user,callback){
        console.log("value:",user);
        const fromDate = moment();
        const nextFriday = fromDate.day(5).format('DD/MM/YYYY');
        console.log(nextFriday);
        var connection = new Connection();
        connection.databaseConnection(null, function(err, data) {
            if (err) {
                logger.error(JSON.stringify(err));
                //callback(boom.badImplementation(err));
                return;
            } else {
                     let Details = `insert into ENGAGEMENT_COMMENTS (SRNumber,Name,Comment,WeekendDate) values(?,?,?,?);`;
                     var values = [user.SR,user.name,user.comment,nextFriday]
                    console.log("query:", Details)
                    console.log("values",values);
                     data.query(Details,values , function(error, results) {
                         if (error) {
                             return console.error('<---------- Error : Error occured while connecting to database and error essage is ---------->\n', error.message);
                         }
                                                                     
                        // console.log('<---------- Success : Successfully updated details:  ---------->\n', members);
                         
                         callback(null,{isError : false});
                         
                     });
                    }
            });
    }

    

}
module.exports = IOService;