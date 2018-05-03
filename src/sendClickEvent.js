const streamClient = require('./streamClient');

const sendClickEvent = (outboundUrl) => {
	return streamClient.publish('link-clicked', {
		outboundUrl: outboundUrl
	})
	.catch(() => Promise.reject());
}

module.exports = sendClickEvent;