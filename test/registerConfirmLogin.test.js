/**
 * Tests for Register, Confirm, Login, Logout, Retrieve routes
 */

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app/app');
const should = chai.should();
const expect = chai.expect;
const {v4: uuidv4} = require('uuid');
const config = require('../app/config.json');

chai.use(chaiHttp);
chai.use(require('chai-json'));

const theBadId = uuidv4();

describe('Routes', () => {

    describe('Register', () => {
        // @TODO it should successfully register

        // @TODO it should properly handle invalid input
        // * userEmail exists
        // * userEmail is not a valid email
        // * userPassword too short
        // * userPassword is one of the most common passwords
    });

    describe('Confirm', () => {
        // @TODO it should successfully confirm

        // @TODO it should properly handle invalid input
        // * confirmation key does not

    });

    describe('Login', () => {
        // @TODO it should successfully login

        // @TODO it should properly handle invalid input

    });

    describe('Logout', () => {

        // @TODO it should successfully logout

        // @TODO it should properly handle invalid input

    });

    describe('Retrieve', () => {

        // @TODO it should successfully retrieve (reset) a lost password

        // @TODO it should properly handle invalid input


    });

});




