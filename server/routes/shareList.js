const express = require('express');
const router = express.Router();

// In-memory data structure to store lists
const lists = [];

// Mock data for testing
lists.push(
    {
        id: '789',
        owner: 'user1',
        members: [],
        items: ['milk', 'bread']
    },
    {
        id: '123',
        owner: 'user2',
        members: ['user1'],
        items: ['eggs', 'cheese']
    }
);

// Share a list with another user
router.put('', (req, res) => {
    const { owner, listid, shareWith } = req.body;

    try {
        // Find the list by ID and owner
        const list = lists.find(list => list.id === listid && list.owner === owner);

        // If the list is not found or the user is not the owner, return an error
        if (!list) {
            return res.status(404).json({ error: 'List not found or you are not the owner' });
        }

        // Add the user to the members array if not already present
        if (!list.members.includes(shareWith)) {
            list.members.push(shareWith);
        }

        // Send the updated list members
        res.json({ members: list.members });
    } catch (error) {
        // Handle server errors
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Export the router
module.exports = router;