const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const path = require('path');

const app = express();
app.use(express.static('public'));
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')));
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')));
app.use('/dat/', express.static(path.join(__dirname, 'node_modules/dat.gui/build')));


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on this port ${PORT}`));
