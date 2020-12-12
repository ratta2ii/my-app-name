const express = require('express');
const routes = require('./Controllers/index.js');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');


const app = express();
const root = './';
const port = process.env.Port || 5000;


app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', routes);


var staticPath = path.join(__dirname, '/');
app.use(express.static(staticPath));

app.get('*', (req, res) => {
    res.sendFile('dist/index.html', { root });
    //! IMPORTANT (SHOULD I TRY THIS???)
    // res.sendFile(__dirname + "/client/index.html");
});

app.listen(port, () => console.log(`Api running on localhost:${port}`));
process.on('SIGINT', () => { console.log("Bye bye!"); process.exit(); });