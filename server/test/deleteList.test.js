const request = require('supertest');
const express = require('express');
const router = require('../routes/deleteList');

const app = express();
app.use(express.json());
app.use('/routes/deleteList', router);

// Describe() is used to define a test suite
describe('DELETE /routes/deleteList', () => {

    // Should return 404 if list does not exist
    it('should return 404 if list does not exist', async () => {
        const res = await request(app)
            .delete('/routes/deleteList')
            .send({ userid: '1', listid: '999' });
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error', 'List not found');
    });

    // Should return 403 if user is not the owner of the list
    it('should return 403 if user is not the owner of the list', async () => {
        const res = await request(app)
            .delete('/routes/deleteList')
            .send({ userid: '1', listid: '1' });
        expect(res.statusCode).toBe(403);
        expect(res.body).toHaveProperty('error', 'Unauthorized');
    });

    // Should delete the list if user is the owner
    it('should delete the list if user is the owner', async () => {
        const res = await request(app)
            .delete('/routes/deleteList')
            .send({ userid: '4', listid: '1' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({});
    });

    // Should return 500 if an error occurs
    it('should return 500 if an error occurs', async () => {
        const originalFindById = router.__get__('findById');
        router.__set__('findById', () => { throw new Error('Test error'); });

        const res = await request(app)
            .delete('/routes/deleteList')
            .send({ userid: '4', listid: '1' });
        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('error', 'Server error');

        router.__set__('findById', originalFindById);
    });
});