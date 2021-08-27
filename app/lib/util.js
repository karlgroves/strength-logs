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

    userExists: async function (userID) {
        const sql = `SELECT userID FROM users WHERE userID=${SqlString.escape(userID)} LIMIT 1`;
        return dbConn.promise()
            .query(sql)
            .then(([rows]) => {
                const matched = !!(rows && rows.length);
                log.info(matched);
                return matched;
            }).catch(error => {
                log.error(error);
                return false;
            });
    },

    userIsAdmin: function (userID) {
        const sql = `SELECT isAdmin FROM users WHERE userID=${SqlString.escape(userID)} LIMIT 1`;

        return dbConn.promise()
            .query(sql).then(([rows]) => {
                if (!rows.length) {
                    return false;
                }

                return rows[0]['isAdmin'] === '1';
            })
            .catch(error => {
                return false;
            });
    }
};
