const express = require('express');
const router = express.Router();

// Mock data for users
const users = [
    {
        userid: 'user1',
        lists: [
            { listid: '123', listName: 'Groceries', sharedToMe: false, archived: false },
            { listid: '456', listName: 'Work', sharedToMe: true, archived: false },
            { listid: '789', listName: 'Travel', sharedToMe: false, archived: true }
        ]
    },
    {
        userid: 'user2',
        lists: [
            { listid: '4', listName: 'Fitness', sharedToMe: false, archived: false },
            { listid: '5', listName: 'Shopping', sharedToMe: true, archived: false },
            { listid: '6', listName: 'Reading', sharedToMe: false, archived: true }
        ]
    }
];

// Route to get all lists for a user
router.get('', (req, res) => {
    const { userid } = req.body;

    // Find user by userid
    const user = users.find(user => user.userid === userid);

    // If user found, return all lists
    if (user) {
        res.json({
            userid: user.userid,
            allLists: user.lists
        });
    } else {
        // If user not found, return error
        res.status(404).json({ error: 'User not found' });
    }
});

// Export the router
module.exports = router;