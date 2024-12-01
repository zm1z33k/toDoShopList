const express = require('express');
const router = express.Router();

// Mock data for lists
const lists = [
    {
        id: '1',
        owner: 'user1',
        members: ['user2'],
        items: [{ id: "1", name: "Milk" }, { id: "2", name: "Bread" }]
    }
];

// Delete item
router.delete('', async (req, res) => {
    const { listid, items } = req.body;

    try {
        // Find the list
        const list = lists.find(l => l.id === listid);

        // Check if the list exists
        if (!list) {
            return res.status(404).json({ error: 'List not found' });
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