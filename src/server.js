import express from 'express';
let app = express();
import * as db from './models/index.js';


app.use('/api', (req, res) => {
    res.json({ nah: `bro you don't lift` });
});

app.get('*', (req, res) => {
    res.json({ bro: 'do you even lift?' });
});

app.listen(3000, () => {
    console.log('listening on port %d', 3000);
});