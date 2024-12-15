const request = require('supertest');
const express = require('express');
const router = require('../routes/archiveList');

const app = express();
app.use(express.json());
app.use('/routes/archiveList', router);

// Describe the test suite for the archiveList route
describe('PUT /routes/archiveList', () => {
    // Should return 404 if list is not found or user is not the owner
    it('should return 404 if list is not found or user is not the owner', async () => {
        const res = await request(app)
            .put('/routes/archiveList')
            .send({ userid: '999', listid: '123456' });
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error', 'List not found or user is not the owner');
    });

    // Should archive the list if user is the owner
    it('should archive the list if user is the owner', async () => {
        const res = await request(app)
            .put('/routes/archiveList')
            .send({ userid: '456', listid: '123456' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('archived', true);
    });

    // Should return 500 if an internal server error occurs
    it('should return 500 if an internal server error occurs', async () => {
        const originalArchiveList = router.__get__('archiveList');
        router.__set__('archiveList', () => { throw new Error('Test error'); });

        const res = await request(app)
            .put('/routes/archiveList')
            .send({ userid: '456', listid: '123456' });
        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('error', 'Internal server error');

        router.__set__('archiveList', originalArchiveList);
    });
});


