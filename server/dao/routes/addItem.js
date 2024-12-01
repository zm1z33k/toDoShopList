const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Mock data for lists and users
const lists = [
    { id: '1', name: 'Groceries', items: [], owner: 'user1' },
    { id: '2', name: 'Hardware', items: [], owner: 'user2' }
];

const users = [
    { id: 'user1', name: 'Alice' },
    { id: 'user2', name: 'Bob' }
];

// Mock function to get list by ID
const getListById = (id) => {
    return lists.find(list => list.id === id);
};

// Mock function to add items to list
const addItemToList = (listid, newItems) => {
    const list = getListById(listid);
    if (list) {
        list.items.push(...newItems);
    }
};

// Mock authentication and authorization
const isAuthenticated = (req, res, next) => {
    req.user = users[0]; // Assume the first user is authenticated
    next();
};

const isAuthorized = (user, list) => {
    return user.id === list.owner;
};

// Add an item to the list
router.put('/addItem', isAuthenticated, async (req, res) => {
    const { listid, items } = req.body;

    try {
        // Get the list by ID
        const list = getListById(listid);

        // Check if the list exists
        if (!list) {
            return res.status(404).json({ error: 'List not found' });
        }

        // Check if the user is authorized to add items to the list
        if (!isAuthorized(req.user, list)) {
            return res.status(403).json({ error: 'Not authorized' });
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