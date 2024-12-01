const express = require('express');
const router = express.Router();

// Mock data
const mockData = [
    { listid: "1", userid: "4", name: "Groceries" },
    { listid: "2", userid: "5", name: "Electronics" },
    { listid: "3", userid: "6", name: "Books" }
];

// Mock findById function
const findById = (listid) => {
    return mockData.find(list => list.listid === listid);
};

// Mock remove function
const remove = (listid) => {
    const index = mockData.findIndex(list => list.listid === listid);
    if (index !== -1) {
        mockData.splice(index, 1);
    }
};

// Delete list
router.delete('', async (req, res) => {
    const { userid, listid } = req.body;

    try {
        // Find the list by id
        const list = findById(listid);

        // If the list does not exist, return a 404 error
        if (!list) {
            return res.status(404).json({ error: 'List not found' });
        }

        // If the user is not the owner of the list, return a 403 error
        if (list.userid !== userid) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        // Remove the list
        remove(listid);

        // Return an empty response
        res.status(200).json({});
    } catch (error) {
        // If there is an error, return a 500 error
        res.status(500).json({ error: 'Server error' });
    }
});

// Export the router
module.exports = router;