const request = require('supertest');
const express = require('express');
const router = require('../routes/createList');

const app = express();
app.use(express.json());
app.use('/routes/createList', router);

// Test cases for the createList route
describe('POST /routes/createList', () => {

    // Should return 400 if userid is not provided
    it('should return 400 if userid is not provided', async () => {
        const res = await request(app)
            .post('/routes/createList')
            .send({ listName: 'Groceries' });
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error', 'userid and listName are required');
    });

    // Should return 400 if listName is not provided
    it('should return 400 if listName is not provided', async () => {
        const res = await request(app)
            .post('/routes/createList')
            .send({ userid: '1' });
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error', 'userid and listName are required');
    });

    // Should create a new list if userid and listName are provided
    it('should create a new list if userid and listName are provided', async () => {
        const res = await request(app)
            .post('/routes/createList')
            .send({ userid: '1', listName: 'Groceries' });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('listid');
        expect(res.body).toHaveProperty('listName', 'Groceries');
        expect(res.body).toHaveProperty('author', '1');
        expect(res.body).toHaveProperty('items', []);
        expect(res.body).toHaveProperty('members', []);
        expect(res.body).toHaveProperty('archived', false);
    });

    // Should return 500 if an error occurs
    it('should return 500 if an error occurs', async () => {
        const originalPush = Array.prototype.push;
        Array.prototype.push = () => { throw new Error('Test error'); };

        const res = await request(app)
            .post('/routes/createList')
            .send({ userid: '1', listName: 'Groceries' });
        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('error', 'An error occurred while creating the list');

        Array.prototype.push = originalPush;
    });
});