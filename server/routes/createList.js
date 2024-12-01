const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Mock database
const lists = [];

// Create a new list
router.post('', (req, res) => {
    const { userid, listName } = req.body;

    // Check if userid and listName are provided
    if (!userid || !listName) {
        return res.status(400).json({ error: 'userid and listName are required' });
    }

    // Create a new list object
    const newList = {
        listid: uuidv4(),
        listName: listName,
        dateCreated: new Date().toISOString(),
        author: userid,
        items: [],
        members: [],
        archived: false
    };

    // Add the new list to the database
    lists.push(newList);

    // Send the new list as response
    res.status(201).json(newList);
});

// Export the router
module.exports = router;