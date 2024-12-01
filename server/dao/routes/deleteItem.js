const express = require('express');
const { verifyUser, isOwnerOrMember } = require('../middleware/auth');
const List = require('../models/List');

const router = express.Router();

// Delete item
router.delete('/deleteItem', verifyUser, async (req, res) => {
    const { listid, items } = req.body;

    try {
        // Find the list
        const list = await List.findById(listid);

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
            list.items.id(item.itemid).remove();
        });

        // Save the list
        await list.save();

        // Send the response
        res.json({ listid });
    } catch (error) {
        // Handle server error
        res.status(500).json({ error: 'Server error' });
    }
});

// Export the router
module.exports = router;