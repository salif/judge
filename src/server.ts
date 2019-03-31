const express: any = require('express');
const app: any = express();
const path: any = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req: any, res: any) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.listen(8142, () => console.log('Listening on port 8142!'));
