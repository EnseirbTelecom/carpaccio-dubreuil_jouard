var request = require('supertest');
describe('loading express', function () {
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
});