import express from 'express';
import fs from 'fs';

const app = express();
const port = 3000;
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
    const fileRead = fs.createReadStream("body.txt");
    fileRead.pipe(res);
});

app.post('/post', (req, res) => {

    const writable = fs.createWriteStream("body.txt", { flags: 'a'})
    writable.write(JSON.stringify(req.body) + '\n');
    
    res.end();
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
});