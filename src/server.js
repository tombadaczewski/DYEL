import express from 'express';
let app = express();
import * as parser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import * as db from './models/index.js';
import user from './routes/user';
import auth from './routes/auth';

app.use(morgan('dev'));
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());
app.use(cors());

app.use('/api', user);
app.use('/auth', auth);

app.get('*', (req, res) => {
    res.json({ bro: 'do you even lift?' });
});

app.listen(3000, () => {
    console.log('listening on port %d', 3000);
});