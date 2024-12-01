const express = require('express');
const router = express.Router();

// Mock data for lists and users
const lists = [
    {
        id: '1',
        owner: 'user1',
        members: ['user2'],
        items: [{ id: 'item1', name: 'Milk' }, { id: 'item2', name: 'Bread' }]
    }
];

const users = [
    { id: 'user1', name: 'Alice' },
    { id: 'user2', name: 'Bob' }
];

// Mock function to verify user
const verifyUser = (req, res, next) => {
    const userId = req.headers['user-id'];
    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    req.user = user;
    next();
};

// Mock function to check if user is owner or member
const isOwnerOrMember = (user, list) => {
    return list.owner === user.id || list.members.includes(user.id);
};

// Delete item
router.delete('/deleteItem', verifyUser, async (req, res) => {
    const { listid, items } = req.body;

    try {
        // Find the list
        const list = lists.find(l => l.id === listid);

        // Check if the list exists
        if (!list) {
            return res.status(404).json({ error: 'List not found' });
        }

        // Check if the user is the owner or a member of the list
        if (!isOwnerOrMember(req.user, list)) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Remove the items
        items.forEach(item => {
            const itemIndex = list.items.findIndex(i => i.id === item.itemid);
            if (itemIndex !== -1) {
                list.items.splice(itemIndex, 1);
            }
        });

        // Send the response
        res.json({ listid });
    } catch (error) {
        // Handle server error
        res.status(500).json({ error: 'Server error' });
    }
});

// Export the router
module.exports = router;