const express = require('express');
const { verifyUser, verifyOwnership } = require('../middleware/auth');
const List = require('../models/List');

const router = express.Router();

// Complete item
router.put('/completeItem', verifyUser, async (req, res) => {
    const { listid, items } = req.body;

    try {
        // Find the list
        const list = await List.findById(listid);

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
            const listItem = list.items.id(item.itemid);
            if (listItem) {
                listItem.completed = item.completed;
            }
        });

        // Save the list
        await list.save();

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