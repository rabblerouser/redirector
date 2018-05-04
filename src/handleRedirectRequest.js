const sendClickEvent = require('./sendClickEvent');

const handleRedirectRequest = (req, res) => {
	if (req.query.outboundUrl) {
		res.redirect(req.query.outboundUrl);
		sendClickEvent(req.query.outboundUrl)
			.catch((e) => console.log(e));
	} else {
		res.status(400).send({ error: "No URL provided to redirect to" });
	}
}

module.exports = handleRedirectRequest;