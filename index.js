const express = require('express');
const path = require('path');
const app = express();
const port = 4000 || process.env.PORT

app.use(express.static(__dirname + "/public"));

app.get('/', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log('Listening on localhost:4000')
})