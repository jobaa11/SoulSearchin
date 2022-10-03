const app = require('./server')
const supertest = require('supertest');
const requestWithSupertest = supertest(app);


describe('status code', () => {
    it('Get / should give me a 200 status code', async () => {
        const res = await requestWithSupertest.get('/');
        expect(res.status).toEqual(200)
    });
});








