const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();


const authConfig = require('../config/auth')

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn : 86400,
    })
}

router.post('/register',async (req,res) => {

    const { email } = req.body;
    try {

        if (await User.findOne({email})) {
            return res.status(400).send({ "error" : "Usuário já existe"})

        }
        
        
        const user = await User.create(req.body);
        user.password = undefined;        

        

        return res.send({user, token : generateToken({ id : user.id })})


        
    } catch (err) {
        return res.status(400).send({ error : 'Registro falho'});
    }
})

router.post('/authenticate', async (req,res) => {
    const {email, password } = req.body;

    const user = await User.findOne({email}).select("+password");

    if(!user) {
        return res.status(400).send({
            error : "Usuário não encontrado",
        })
    }

    
    if(!await bcrypt.compare(password,user.password)){
        return res.status(400).send({
            error : 'senha invalida',

        })
    }

    user.password = undefined;
    const token = generateToken({ id : user.id })

    res.send({user, token});

})

module.exports = app => app.use('/auth', router);