const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.listen(8142, () => console.log('Go to http://localhost:8142'));
