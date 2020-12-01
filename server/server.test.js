var request = require('supertest');

describe('Test Server', function () {
    var server;

    beforeEach(function () {
        server = require('./server');
    });

    afterEach(function () {
        server.close();
    });

    it('GET /', function testSlash(done) {
    request(server)
        .get('/')
        .expect(200, done);
    });
    it('GET /id', function testId(done) {
        request(server)
            .get('/id')
            .expect(200, done);
    });
    it('POST /bill', function testBill(done) {
        request(server)
            .post('/bill')
            .send({ "prices" : [15, 11], "quantities" : [1, 2], "country" : "FR" })
            .set('Accept', 'application/json')
            .expect(200, done);
    });
});