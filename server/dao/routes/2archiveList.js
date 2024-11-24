const express = require('express');
const { getUserList, archiveList } = require('../services/listService');

const router = express.Router();

// Archive a list
router.put('/archiveList', function (req, res) {
    const userid = req.body.userid;
    const listid = req.body.listid;

    try {
        // Check if the user ID is defined
        const list = getUserList(userid, listid);
        if (!list) {
            res.status(404).json({ error: 'List not found or user is not the owner' });
        } else {
            // Archive the list
            archiveList(listid);
            res.json({ archived: true });
        }
    } catch (error) {
        // Internal server error
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Export the router
module.exports = router;
