const express = require('express');
const shortid = require('shortid');
const router = express.Router();
const URL = require('../models/url');

router.post('/', async (req, res) => {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: 'URL is required' })
    } 
    const shortId = shortid();
    await URL.create({ shortId, redirectURL: body.url, visitedHistory: [],createdBy:req.user._id });
    return res.render('home',{
        id:shortId,
    });
    // return res.status(200).json({ id: shortId });
})

router.get('/:shortid', async (req, res) => {
    const shortId = req.params.shortid;
    const url = await URL.findOneAndUpdate({ shortId }, 
        { $push: { visitHistory: { timestamp: Date.now(), ip: req.ip } } }
    );
    if (!url) {
        return res.status(404).json({ error: 'URL not found' });
    }
    res.redirect(url.redirectURL);
})

router.get('/analytics/:shortid' ,async (req,res) => {
    const shortId = req.params.shortid;
    const url = await URL.findOne({shortId});
    if(!url){
        return res.status(404).json({error:'URL not found'});
    }
    return res.status(200).json(url.visitHistory);
})

router.get('/api/test',async (req,res) => {
    const allURLs = await URL.find({});
    return res.render('home',{
        urls: allURLs,
    });

})


module.exports = router;
