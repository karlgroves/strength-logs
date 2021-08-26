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
        const sql = `SELECT userID FROM users WHERE userID=${SqlString.escape(userID)} LIMIT 1`;

        return dbConn.query(sql, (error, results) => {
            if (error) {
                log.error(error);
                return false;
            }

            const matched = !!(results && Array.isArray(results) && results.length);
            log.info(matched);
            return matched;
        });
    },

    userIsAdmin: function (userID) {
        const sql = `SELECT isAdmin FROM users WHERE userID=${SqlString.escape(userID)} LIMIT 1`;

        return dbConn.query(sql, (error, results) => {
            if (error || !Array.isArray(results) || !results.length) {
                return false;
            }

            return results[0]['isAdmin'] === 1;
        });
    }
};
