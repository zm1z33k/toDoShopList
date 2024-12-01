const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { getListById, addItemToList } = require('../services/listService');
const { isAuthenticated, isAuthorized } = require('../middleware/auth');

const router = express.Router();

// Add an item to the list
router.put('/addItem', isAuthenticated, async (req, res) => {
    const { listid, items } = req.body;

    try {
        // Get the list by ID
        const list = await getListById(listid);

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
        await addItemToList(listid, newItems);

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