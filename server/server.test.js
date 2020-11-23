var request = require('supertest');

describe('Test des fonctionnalités de Carpaccio', function () {
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
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {
                id: 'carpaccio-dubreuil_jouard'
            }, done);
    });

    it('POST /bill (bad arguments)', function testBill(done) {
        request(server)
            .post('/bill')
            .send({ "prices" : [10, 20] })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done)
    }); 

    it('POST /bill', function testBill(done) {
        request(server)
            .post('/bill')
            .send({ "prices" : [10, 20], "quantities" : [1, 2] })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {
                total: 50
            }, done);
    });
});