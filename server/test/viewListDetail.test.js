const request = require('supertest');
const express = require('express');
const router = require('../routes/viewListDetail');

const app = express();
app.use(express.json());
app.use('/routes/viewListDetail', router);

// define the tests
describe('GET /routes/viewListDetail', () => {

    // should return 401 if userid is not provided
    it('should return 401 if userid is not provided', async () => {
        const res = await request(app)
            .get('/routes/viewListDetail')
            .send({ listid: '4' });
        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty('error', 'Unauthorized');
    });

    // Should return 403 if user does not have access to the list
    it('should return 403 if user does not have access to the list', async () => {
        const res = await request(app)
            .get('/routes/viewListDetail')
            .send({ userid: '1', listid: '5' });
        expect(res.statusCode).toBe(403);
        expect(res.body).toHaveProperty('error', 'Access denied');
    });

    // Should return the list items if user has access
    it('should return the list items if user has access', async () => {
        const res = await request(app)
            .get('/routes/viewListDetail')
            .send({ userid: '1', listid: '4' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('listid', '4');
        expect(res.body.items).toEqual([
            { item: 'Milk', quantity: 2, completed: true },
            { item: 'Bread', quantity: 1, completed: false }
        ]);
    });

    // Should return an empty list if listid does not exist
    it('should return an empty list if listid does not exist', async () => {
        const res = await request(app)
            .get('/routes/viewListDetail')
            .send({ userid: '1', listid: '999' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('listid', '999');
        expect(res.body.items).toEqual([]);
    });

    // Should return 500 if an error occurs
    it('should return 500 if an error occurs', async () => {
        const originalVerifyListAccess = router.__get__('verifyListAccess');
        router.__set__('verifyListAccess', () => { throw new Error('Test error'); });

        const res = await request(app)
            .get('/routes/viewListDetail')
            .send({ userid: '1', listid: '4' });
        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('error', 'An error occurred while fetching the list');

        router.__set__('verifyListAccess', originalVerifyListAccess);
    });
});