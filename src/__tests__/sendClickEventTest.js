const sendClickEvent = require('../sendClickEvent');
const streamClient = require('../streamClient');

const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));
var expect = chai.expect;

it('publishes a link-clicked event', () => {
	const testOutboundUrl = 'http://test.com';
	const eventBody = {outboundUrl: 'http://test.com'};

	var publishStub = sinon.stub(streamClient, "publish");
	publishStub.resolves();

	return sendClickEvent(testOutboundUrl)
		.then(() => {
			expect(publishStub).to.have.been.calledWith('link-clicked', eventBody);
		});
});