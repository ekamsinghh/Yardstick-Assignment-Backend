const express = require('express');
const { createNote, getNotes, getNote, updateNote, deleteNote } = require('../controllers/noteController.js');
const { login } = require('../controllers/authController.js');
const protect = require('../middleware/authMiddleware.js');
const { upgradeSubscription } = require('../controllers/tenantController.js');
const router = express.Router();

//auth
router.post('/login',login);

//notes
router.post('/notes',protect,createNote);
router.get('/notes',protect,getNotes);
router.get('/notes/:id',protect,getNote);
router.put('/notes/:id',protect,updateNote);
router.delete('/notes/:id',protect,deleteNote);

//health check
router.get('/health', (req,res) => {
    try{
        res.status(200).json({
            status: 'OK'
        });
    }catch(error){
        res.status(500).json({
            status: 'ERROR',
            error: error.message
        });
    }
});

//upgrade
router.post('/tenants/:slug/upgrade',protect,upgradeSubscription);

module.exports = router;