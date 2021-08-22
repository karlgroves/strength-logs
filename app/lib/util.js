/**
 * Utility functions
 */

'use strict';

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

    }
};
