const request = require('supertest');
const express = require('express');
const router = require('../routes/viewAllLists');

const app = express();
app.use(express.json());
app.use('/routes/viewAllLists', router);

// define the tests
describe('GET /routes/viewAllLists', () => {

    // Should return 404 if userid is not provided
    it('should return 404 if userid is not provided', async () => {
        const res = await request(app)
            .get('/routes/viewAllLists')
            .send({});
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error', 'User not found');
    });

    // Should return 404 if user does not exist
    it('should return 404 if user does not exist', async () => {
        const res = await request(app)
            .get('/routes/viewAllLists')
            .send({ userid: 'nonexistent' });
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error', 'User not found');
    });

    // Should return all lists for a valid user
    it('should return all lists for a valid user', async () => {
        const res = await request(app)
            .get('/routes/viewAllLists')
            .send({ userid: 'user1' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('userid', 'user1');
        expect(res.body.allLists).toEqual([
            { listid: '123', listName: 'Groceries', sharedToMe: false, archived: false },
            { listid: '456', listName: 'Work', sharedToMe: true, archived: false },
            { listid: '789', listName: 'Travel', sharedToMe: false, archived: true }
        ]);
    });

    // Should return all lists for another valid user
    it('should return all lists for another valid user', async () => {
        const res = await request(app)
            .get('/routes/viewAllLists')
            .send({ userid: 'user2' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('userid', 'user2');
        expect(res.body.allLists).toEqual([
            { listid: '4', listName: 'Fitness', sharedToMe: false, archived: false },
            { listid: '5', listName: 'Shopping', sharedToMe: true, archived: false },
            { listid: '6', listName: 'Reading', sharedToMe: false, archived: true }
        ]);
    });
});