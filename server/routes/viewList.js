const express = require('express');
const router = express.Router();

// Mock data for users and lists
const mockUsers = [
    { userid: '1', listid: ['4'] },
    { userid: '2', listid: ['5'] }
];

const mockLists = {
    "4": [
        { item: 'Milk', quantity: 2 },
        { item: 'Bread', quantity: 1 }
    ],
    "5": [
        { item: 'Eggs', quantity: 12 },
        { item: 'Butter', quantity: 1 }
    ]
};

// Updated mock function to verify list access using mock data
const verifyListAccess = async (userid, listid) => {
    const user = mockUsers.find(user => user.userid === userid);
    return user && user.listid.includes(listid);
};

// Updated mock function to get list items using mock data
const getListItems = async (userid, listid) => {
    return mockLists[listid] || [];
};

// Mock function to verify user
const verifyUser = (req, res, next) => {
    // Mock user verification logic
    const { userid } = req.body;
    if (userid) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// Route to view a list
router.get('', verifyUser, async (req, res) => {
    try {
        // Get the listid from the request body
        const { userid, listid } = req.body;
        const hasAccess = await verifyListAccess(userid, listid);

        // Check if the user has access to the list
        if (!hasAccess) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Get the list items
        const items = await getListItems(userid, listid);

        // Send the response
        res.json({
            listid: listid,
            items: items
        });
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: 'An error occurred while fetching the list' });
    }
});

// Export the router
module.exports = router;