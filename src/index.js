const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv').config('./.env');

const app = express();

app.use(express.json());

const PORT = 3000;
app.listen(PORT, () => console.log('Server is running on port ' + PORT));