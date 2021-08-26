/**
 * Utility functions
 */

const SqlString = require('sqlstring');
const dbService = require('../lib/dbService');
const dbConn = dbService.db();

module.exports = {

    getPKName: function (table) {
        let idField = false;

        switch (table) {
            case 'exercises':
                idField = 'exerciseID';
                break;
            case 'traininglogs':
                idField = 'trainingLogID';
                break;
            case 'users':
                idField = 'userID';
                break;
            default:
                idField = false;
        }
        return idField;
    },

    userExists: function (userID) {

        let sql = 'SELECT userID FROM users WHERE userID=' + SqlString.escape(userID) + ' LIMIT 1';

        let matched =  dbConn.query(sql, (error, results, fields) => {
            if (error) {
                log.error(error);
                return false;
            }
            else {

                if (typeof results !== 'object'|| results.length === 0) {
                    console.log('NO USER MATCH!');
                    return false;
                }
                else if (results) {

                    console.log(results);

                    console.log('USER MATCHED!');
                    return true;
                }
            }

        });

        log.info(typeof matched);
        log.info(matched);

        return matched;

    },

    userIsAdmin: function (userID) {
        let sql = 'SELECT isAdmin FROM users WHERE userID=' + SqlString.escape(userID) + ' LIMIT 1';

        dbConn.query(sql, (error, results, fields) => {
            if (error) {
                return false;
            }
            else {

                if (typeof results !== 'object'|| results.length === 0) {
                    return false;
                }
                else if (results[0]['isAdmin'] === 1) {
                    return true;
                }
                else{
                    return false;
                }
            }
        });

    }
};
