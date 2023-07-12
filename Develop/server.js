// Import Modules
const express = require('express');
const path = require('path');
const fs = require('fs');
// Express Application
const app = express();
// PORT
const PORT = process.env.PORT || 3000;
// Parsing for:
// Json data
app.use(express.json());
// urlended data
app.use(express.urlencoded({ extended: true }));
// Static files
app.use(express.static('public'));