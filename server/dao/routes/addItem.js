const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Mock data for listid
const mockLists = [
    {
        listid: '123456',
        items: [
            { itemid: 'abc123', itemName: 'Milk', count: 2, completed: false },
            { itemid: 'def456', itemName: 'Bread', count: 1, completed: false }
        ]
    },
    {
        listid: '789012',
        items: [
            { itemid: 'ghi789', itemName: 'Eggs', count: 12, completed: false },
            { itemid: 'jkl012', itemName: 'Butter', count: 1, completed: false }
        ]
    }
];

// Function to get list by ID
const getListById = (listid) => {
    return mockLists.find(list => list.listid === listid);
};

// Function to add items to the list
const addItemToList = (listid, newItems) => {
    const list = getListById(listid);
    if (list) {
        list.items.push(...newItems);
    }
};

// Add an item to the list
router.put('', async (req, res) => {
    const { listid, items } = req.body;

    try {
        // Get the list by ID
        const list = getListById(listid);

        // Check if the list exists
        if (!list) {
            return res.status(404).json({ error: 'List not found' });
        }

        // Create a new item object
        const newItems = items.map(item => ({
            itemid: uuidv4().slice(0, 6),
            itemName: item.itemName,
            count: item.count,
            completed: false
        }));

        // Add the new items to the list
        addItemToList(listid, newItems);

        // Send the response
        res.json({
            listid,
            items: newItems
        });
    } catch (error) {
        // Log the error
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Export the router
module.exports = router;