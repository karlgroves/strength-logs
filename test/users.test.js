/**
 * Tests for User Routes
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
const theThing = 'users';

describe('Routes', () => {

    describe('/POST', () => {

        // This one also sets up the actual request that gets used in other tests
        it('it should successfully POST a test request', (done) => {
            chai.request(server)
            .post('/')
            .set('content-type', 'application/json')
            .send({
                responseID: config.testParams.responseID
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
            .post('/')
            .set('content-type', 'application/json')
            .send({
                responseID: config.testParams.responseID
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
            .post('/')
            .set('content-type', 'application/json')
            .send({
                    responseID: config.testParams.responseID
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

        it('it should fail because responseID is not a UUID', (done) => {
            chai.request(server)
            .post('/')
            .set('content-type', 'application/json')
            .send({
                    responseID: config.testParams.responseID
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

        it('it should fail because url does not exist in the POST body', (done) => {
            chai.request(server)
            .post('/')
            .send({
                    responseID: config.testParams.responseID
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
                expect(res.body.info).to.equal('required parameter URL is not set');
                done();
            });
        });

        it('it should fail because the supplied `url` is not a URL', (done) => {
            chai.request(server)
            .post('/')
            .set('content-type', 'application/json')
            .send({
                responseID: config.testParams.responseID
            })
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(400);
                expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                expect(res).to.be.json;
                expect(res.body.status).to.equal(400);
                expect(res.body.message).to.equal('BAD REQUEST');
                expect(res.body.code).to.equal('invalid_param');
                expect(res.body.info).to.equal('required parameter URL is invalid');
                done();
            });
        });

        it('it should fail because req.body is not JSON', (done) => {
            chai.request(server)
            .post('/')
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
        it('it should GET a result by ID', (done) => {
            chai.request(server)
            .get('/' + config.testParams.responseID)
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

        it('it should fail because no ID was provided in the request', (done) => {
            chai.request(server)
            .get('/')
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(400);
                expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                expect(res).to.be.json;
                expect(res.body.status).to.equal(400);
                expect(res.body.message).to.equal('BAD REQUEST');
                expect(res.body.code).to.equal('invalid_param');
                expect(res.body.info).to.equal('GET requests require `id` parameter');
                done();
            });
        });

        it('it should fail because the ID was not found', (done) => {
            chai.request(server)
            .get('/' + theBadId)
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
        it('it should fail a PUT request because PUT is not supported', (done) => {
            chai.request(server)
            .put('/poop')
            .set('content-type', 'application/json')
            .send(
                {
                    responseID: config.testParams.responseID
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
