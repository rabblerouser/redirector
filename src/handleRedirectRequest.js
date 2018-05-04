const streamClient = require('./streamClient');

const sendClickEvent = (outboundUrl) => {
	return streamClient.publish('link-clicked', {
		outboundUrl: outboundUrl
	})
	.catch(() => Promise.reject({ status: 500, message: 'Failed to publish event'}));
}

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