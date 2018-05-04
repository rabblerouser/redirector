const streamClient = require('./streamClient');

const sendClickEvent = (outboundUrl) => {
	return streamClient.publish('link-clicked', {
		outboundUrl: outboundUrl
	})
	.catch(() => Promise.reject({ status: 500, message: 'Failed to publish event'}));
}

module.exports = sendClickEvent;