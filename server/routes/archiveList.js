const express = require('express');
const router = express.Router();

// Mock data for listid
const mockLists = [
    {
        listid: '123456',
        listName: "Dinner List",
        dateCreated: "2024-11-2T12:00:00Z",
        author: '456',
        items: [],
        members: [],
        archived: false
    },
    {
        listid: '654321',
        listName: "Sunday dinner",
        dateCreated: "2024-11-2T12:00:00Z",
        author: '789',
        items: [],
        members: [],
        archived: true
    }
];

// Mock functions to replace the services
async function getUserList(userid, listid) {
    // Implement your logic to get the user list
    // This is a mock implementation
    if (userid && listid) {
        return { id: listid, userId: userid };
    }
    return null;
}

async function archiveList(listid) {
    // Implement your logic to archive the list
    // This is a mock implementation
    console.log(`List with id ${listid} archived`);
}

// Archive a list
router.put('', async function (req, res) {
    const userid = req.body.userid;
    const listid = req.body.listid;

    try {
        // Check if the user ID is defined
        const list = await getUserList(userid, listid);
        if (!list) {
            res.status(404).json({ error: 'List not found or user is not the owner' });
        } else {
            // Archive the list
            await archiveList(listid);
            res.json({ archived: true });
        }
    } catch (error) {
        // Internal server error
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Export the router
module.exports = router;
