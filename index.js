const express = require("express");
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'build')));

//Cors for local file access
const cors = require("cors");
app.use(cors());

const port = 8080;
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'bank-client/build', 'index.html'));
});


app.listen(port, () => {
    console.log("Server running at port : " + port);
});