import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import models from '../models/index';

let config = require('../../config.json');
let user = models.user;

let router = Router();
router.post('/register', (req, res) => {

    user.create(req.body)
        .then((user) => {
            res.json({ id: user.id, user: user.username });
        })
        .catch((error) => {
            res.json({ error: error });
        });
});

router.post('/authenticate', (req, res) => {

    user.find({ where: { username: req.body.username } })
        .then((user) => {
            if (!user) {
                return res.json({
                    success: false,
                    message: 'Authentication failed. User not found.'
                });
            } else if (user) {

                let validPassword = bcrypt.compareSync(req.body.password, user.dataValues.password);

                if (!validPassword) {
                    res.json({
                        success: false,
                        message: 'Authentication failed. Wrong password.'
                    });
                } else {
                    var token = jwt.sign({
                        id: user.dataValues.id,
                        username: user.dataValues.username,
                        email: user.dataValues.email,
                    }, config.secret, {
                            expiresIn: 1440 // expires in 24 hours
                        });

                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }
            }
        });
});

router.get('/getme', (req, res) => {
    let token = req.body.token || req.param('token') || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                res.status(403).send({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                user.find({ where: { id: decoded.id } })
                    .then((user) => {
                        let me = {
                            id: user.dataValues.id,
                            username: user.dataValues.username,
                            email: user.dataValues.email
                        };
                        return res.json(me);
                    });
            }
        });
    } else {
        res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});

export default router;