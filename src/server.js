let express = require('express');
let app = express();

app.use('/api', (req, res) => {
    res.json({nah: `bro you don't lift`});
});

app.get('*', (req, res) => {
    res.json({bro: 'do you even lift?'});
});

app.listen(3000, function() {
    console.log('listening on port %d', 3000);
});