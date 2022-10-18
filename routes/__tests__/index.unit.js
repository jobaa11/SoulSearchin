const supertest = require('supertest');
const app = require('../../server');
const MockUser = require('../../models/__mocks__/user')
path = require('path')
const passportMock = require(path.join(process.cwd(), 'config', '__mocks__', 'passport'))

jest.mock('../../config/__mocks__/strategy')


describe('Get Landing page', function () {
        it('should load the landing page', async function () {
                const res = await supertest(app).get('/');
                expect(res.header['content-type']).toBe('text/html; charset=utf-8');
                expect(res.statusCode).toBe(200);
            });
    })

    describe('Get about page', function () {
        it('should render about page', async function () {
            const res = await supertest(app).get('/');
            expect(res.header['content-type']).toBe('text/html; charset=utf-8');
            expect(res.statusCode).toBe(200);
        })
    })
    describe('Get contact page', function () {
        it('should render a contact page', async function () {
            const res = await supertest(app).get('/');
            expect(res.header['content-type']).toBe('text/html; charset=utf-8');
            expect(res.statusCode).toBe(200);
        })
    })

    describe('Logout page', function () {
        it('should logout', async function () {
            const res = await supertest(app).get('/');
            expect(res.header['content-type']).toBe('text/html; charset=utf-8');
            expect(res.statusCode).toBe(200);
        })
    })