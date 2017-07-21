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
    describe('/feeds', () => {
        it('GET /feeds', (done) => {
            request(app)
                .get('/feeds')
                .expect(200)
                .end(done);
        });
        it('이름이 없다면 400을 반환한다.', (done) => {
            request(app)
                .post('/feeds')
                .expect(400)
                .end(done);
        });
        it('이름이 있다면 이름을 반환한다.', (done) => {
            const name = 'lejohy';
            request(app)
                .post('/feeds?name=' + name)
                .expect(200)
                .end((err, res) => {
                    res.body.should.have.property('data', 'hello ' + name);
                    done();
                });
        });
    });

    describe('GET /error', () => {
        it('error raise', (done) => {
            request(app)
                .get('/error')
                .expect(500)
                .end(done);
        });
    });
});