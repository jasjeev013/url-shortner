const express = require('express');
const router = express.Router();
const User = require('../models/user')
const { setUser } = require('../service/auth');

router.post('/',async (req,res) => {
    const {name,email,password} = req.body;
    await User.create({name,email,password});
    return res.redirect('/');
 })

router.post('/login',async (req,res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email,password});
    if(!user){
        res.render('login',{
            error: 'Invalid username or password'
        });

    }
    
    const token = setUser(user);
    res.cookie('token',token);  

    return res.redirect('/');
 })


module.exports = router;