const app = require('../app');
const request = require('supertest');
const should = require('should');

describe('ci demo test suite', () => {
    describe('GET /', () => {
        it('GET app root', (done) => {
            request(app)
                .get('/')
                .expect(200)
                .end(done);
        });
        it('404 Not Found', (done) => {
            request(app)
                .get('/aa')
                .expect(404)
                .end(done);
        });
    });
});