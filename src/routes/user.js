import { Router } from 'express';
import models from '../models/index';
import * as _ from 'lodash';

let user = models.user;

let router = Router();
router.get('/user', (req, res) => {

    user.findAll()
        .then((users) => {
            let user = (n) => {
                return { id: n.id, username: n.username };
            };
            users = _.map(users, user);
            console.log(users)
            res.json({ users: users });
        })
        .catch((error) => {
            res.json({ error: error });
        });
});

router.get('/user/:id', (req, res) => {

    user.findOne({where:{ id: req.params.id }})
        .then((user) => {
            res.json({ id: user.id, username: user.username });
        })
        .catch((error) => {
            res.json({ error: error });
        })
});

export default router;