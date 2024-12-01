const express = require('express');
const router = express.Router();

// Mock data for demonstration purposes
const mockLists = [
    {
        listid: "1",
        owner: 'user1',
        items: [
            { itemid: 'a', completed: false },
            { itemid: 'b', completed: false }
        ]
    }
];

// Mock function to verify user
const verifyUser = (req, res, next) => {
    req.user = { id: 'user1' }; // Mock user
    next();
};

// Mock function to verify ownership
const verifyOwnership = (user, list) => {
    return user.id === list.owner;
};

// Complete item
router.put('', verifyUser, async (req, res) => {
    const { listid, items } = req.body;

    try {
        // Find the list
        const list = mockLists.find(list => list.listid === listid);

        // Check if the list exists
        if (!list) {
            return res.status(404).json({ error: 'List not found' });
        }

        // Check if the user is the owner of the list
        if (!verifyOwnership(req.user, list)) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Update the items
        items.forEach(item => {
            const listItem = list.items.find(i => i.itemid === item.itemid);
            if (listItem) {
                listItem.completed = item.completed;
            }
        });

        // Respond with the updated list
        res.json({
            listid,
            items: items.map(item => ({
                itemid: item.itemid,
                completed: item.completed
            }))
        });
    } catch (error) {
        // Log the error and return a 500 status code
        res.status(500).json({ error: 'Server error' });
    }
});

// Export the router
module.exports = router;