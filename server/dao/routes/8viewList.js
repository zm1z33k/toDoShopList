const express = require('express');
const { verifyUser, verifyListAccess } = require('../middleware/auth');
const { getListItems } = require('../controllers/listController');

const router = express.Router();

// Route to view a list
router.get('/viewList', verifyUser, verifyListAccess, async (req, res) => {
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
