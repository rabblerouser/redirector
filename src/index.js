#!/usr/bin/env node

const express = require('express');
const sendClickEvent = require('./sendClickEvent');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	if (req.query.outboundUrl) {
		sendClickEvent(req.query.outboundUrl)
			.catch(() => console.log("Failed to publish click event"));
		res.redirect(req.query.outboundUrl);
	} else {
		res.status(400).send({ error: "No URL provided to redirect to" });
	}
});

app.listen(port, () => {
	console.log(`Now listening on port ${ port } for redirect requests`);
});