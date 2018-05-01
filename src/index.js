#!/usr/bin/env node

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	if (req.query.clickedurl) {
		res.redirect(req.query.clickedurl);
	} else {
		res.status(400).send({ error: "No URL provided to redirect to" });
	}
});

app.listen(port, () => {
	console.log(`Now listening on port ${ port } for redirect requests`);
});