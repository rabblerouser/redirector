#!/usr/bin/env node

const express = require('express');
const handleRedirectRequest = require('./handleRedirectRequest');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	handleRedirectRequest(req, res);
});

app.listen(port, () => {
	console.log(`Now listening on port ${ port } for redirect requests`);
});