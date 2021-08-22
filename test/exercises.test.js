/**
 * Tests for Exercise Routes
 */

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app/app');
const should = chai.should();
const expect = chai.expect;
const {v4: uuidv4} = require('uuid');
const config = require('../config.json');

chai.use(chaiHttp);
chai.use(require('chai-json'));

const theBadId = uuidv4();

describe('Routes', () => {

    describe('/POST', () => {

        it('it should successfully POST a test request', (done) => {
            chai.request(server)
            .post('/exercises/')
            .set('content-type', 'application/json')
            .send({
                responseID: config.testParams.responseID,
                url: config.testParams.url,
                viewportHeight: config.testParams.viewportHeight,
                viewportWidth: config.testParams.viewportWidth,
                waitFor: config.testParams.waitFor,
                callbackUrl: config.testParams.callbackUrl
            })
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(200);
                expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                expect(res).to.be.json;
                expect(res.body.status).to.equal(200);
                expect(res.body.message).to.equal('OK');
                expect(res.body.code).to.equal('success');
                expect(res.body.info).to.equal('Record was successfully added!');
                done();
            });
        });

        it('it should fail because responseID does not exist in the POST body', (done) => {
            chai.request(server)
            .post('/exercises/')
            .set('content-type', 'application/json')
            .send({
                url: config.testParams.url,
                viewportHeight: config.testParams.viewportHeight,
                viewportWidth: config.testParams.viewportWidth,
                waitFor: config.testParams.waitFor,
                callbackUrl: config.testParams.callbackUrl
            })
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(400);
                expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                expect(res).to.be.json;
                expect(res.body.status).to.equal(400);
                expect(res.body.message).to.equal('BAD REQUEST');
                expect(res.body.code).to.equal('invalid_param');
                expect(res.body.info).to.equal('required parameter `responseID` not set');
                done();
            });
        });

        it('it should fail because responseID is blank', (done) => {
            chai.request(server)
            .post('/exercises/')
            .set('content-type', 'application/json')
            .send({
                    responseID: '',
                    url: config.testParams.url,
                    viewportHeight: config.testParams.viewportHeight,
                    viewportWidth: config.testParams.viewportWidth,
                    waitFor: config.testParams.waitFor,
                    callbackUrl: config.testParams.callbackUrl
                }
            )
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(400);
                expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                expect(res).to.be.json;
                expect(res.body.status).to.equal(400);
                expect(res.body.message).to.equal('BAD REQUEST');
                expect(res.body.code).to.equal('invalid_param');
                expect(res.body.info).to.equal('required parameter `responseID` is not a valid UUID');
                done();
            });
        });

        it('it should fail because req.body is not JSON', (done) => {
            chai.request(server)
            .post('/exercises/')
            .set('content-type', 'application/json')
            .send('poop')
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(400);
                done();
            });
        });
    });

    describe('/GET', () => {

        it('it should GET a list of all existing exercises', (done) => {
            chai.request(server)
            .get('/exercises/')
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(200);
                expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                expect(res).to.be.json;
                expect(res.body.status).to.equal(200);
                expect(res.body.message).to.equal('OK');
                expect(res.body.code).to.equal('success');
                done();
            });
        });

        it('it should GET a result by ID', (done) => {
            chai.request(server)
            .get('/exercises/' + config.testParams.responseID)
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(200);
                expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                expect(res).to.be.json;
                expect(res.body.status).to.equal(200);
                expect(res.body.message).to.equal('OK');
                expect(res.body.code).to.equal('success');
                done();
            });
        });


        it('it should fail because the ID was not found', (done) => {
            chai.request(server)
            .get('/exercises/' + theBadId)
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(404);
                expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                expect(res).to.be.json;
                expect(res.body.status).to.equal(404);
                expect(res.body.message).to.equal('NOT FOUND');
                expect(res.body.code).to.equal('not_found');
                expect(res.body.info).to.equal('Record identified by the supplied `id` does not exist');
                done();
            });
        });
    });

    describe('/PUT', () => {
        it('it should update a record', (done) => {
            chai.request(server)
            .put('/exercises/')
            .set('content-type', 'application/json')
            .send(
                {
                    responseID: config.testParams.responseID,
                    url: config.testParams.url,
                    viewportHeight: config.testParams.viewportHeight,
                    viewportWidth: config.testParams.viewportWidth,
                    waitFor: config.testParams.waitFor,
                    callbackUrl: config.testParams.callbackUrl
                }
            )
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(405);
                expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                expect(res).to.be.json;
                expect(res.body.status).to.equal(405);
                expect(res.body.message).to.equal('Method Not Allowed');
                expect(res.body.code).to.equal('method_not_allowed');
                expect(res.body.info).to.equal('Request method is not honored by this API');
                done();
            });
        });

        it('it should fail to update a record because the ID doe not exist', (done) => {
            chai.request(server)
            .put('/exercises/')
            .set('content-type', 'application/json')
            .send(
                {
                    responseID: config.testParams.responseID,
                    url: config.testParams.url,
                    viewportHeight: config.testParams.viewportHeight,
                    viewportWidth: config.testParams.viewportWidth,
                    waitFor: config.testParams.waitFor,
                    callbackUrl: config.testParams.callbackUrl
                }
            )
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(405);
                expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                expect(res).to.be.json;
                expect(res.body.status).to.equal(405);
                expect(res.body.message).to.equal('Method Not Allowed');
                expect(res.body.code).to.equal('method_not_allowed');
                expect(res.body.info).to.equal('Request method is not honored by this API');
                done();
            });
        });
    });

    describe('/HEAD', () => {
        it('it should HEAD a result by ID', (done) => {
            chai.request(server)
            .head('/' + config.testParams.responseID)
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(200);
                done();
            });
        });

        it('it should fail because no ID was provided in the request', (done) => {
            chai.request(server)
            .head('/')
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(400);
                done();
            });
        });

        it('it should fail because the ID was not found', (done) => {
            chai.request(server)
            .head('/' + theBadId)
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(404);
                done();
            });
        });

    });

    describe('/DELETE', () => {
        it('it should DELETE a result by ID', (done) => {
            chai.request(server)
            .delete('/' + config.testParams.responseID)
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(200);
                expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                expect(res).to.be.json;
                expect(res.body.status).to.equal(200);
                expect(res.body.message).to.equal('OK');
                expect(res.body.code).to.equal('success');
                expect(res.body.info).to.equal('Record was successfully deleted');
                done();
            });
        });

        it('it should fail because no ID was provided', (done) => {
            chai.request(server)
            .delete('/')
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(400);
                expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                expect(res).to.be.json;
                expect(res.body.status).to.equal(400);
                expect(res.body.message).to.equal('BAD REQUEST');
                expect(res.body.code).to.equal('invalid_param');
                expect(res.body.info).to.equal('DELETE requests require `id` param');
                done();
            });
        });

        it('it should fail because the ID was not found', (done) => {
            chai.request(server)
            .delete('/poop')
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(404);
                expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                expect(res).to.be.json;
                expect(res.body.status).to.equal(404);
                expect(res.body.message).to.equal('NOT FOUND');
                expect(res.body.code).to.equal('not_found');
                expect(res.body.info).to.equal('Record identified by the supplied `id` does not exist');
                done();
            });
        });
    });
});
