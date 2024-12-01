const express = require('express');
const router = express.Router();

// Delete list
router.delete('/deleteList', async (req, res) => {
    const { userid, listid } = req.body;

    try {
        // Find the list by id
        const list = await list.findById(listid);

        // If the list does not exist, return a 404 error
        if (!list) {
            return res.status(404).json({ error: 'List not found' });
        }

        // If the user is not the owner of the list, return a 403 error
        if (list.owner.toString() !== userid) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        // Remove the list
        await list.remove();

        // Return an empty response
        res.status(200).json({});
    } catch (error) {
        // If there is an error, return a 500 error
        res.status(500).json({ error: 'Server error' });
    }
});

// Export the router
module.exports = router;