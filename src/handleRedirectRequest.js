const handleRedirectRequest = (req, res) => {
	res.redirect(req.query.outboundUrl);
}

module.exports = handleRedirectRequest;