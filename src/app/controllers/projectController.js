const express = require('express')
const router = express.Router();
const authMiddleware = require('../middlewares/auth');


router.use(authMiddleware);

router.get('/',function(req,res){
    res.send({ ok : true, user : req.userId})
})

module.exports = app => app.use('/projects',router);