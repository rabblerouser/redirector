const handleRedirectRequest = require('../handleRedirectRequest');
const streamClient = require('../streamClient');

const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));
var expect = chai.expect;

describe('handleRedirectRequest', () => {

	it('redirects an incoming request when an outbound URL is provided', () => {
		const testOutboundUrl = 'http://test.com';
		const req = { query: { outboundUrl: 'http://test.com' }};
		const res = { redirect: sinon.stub() };

		handleRedirectRequest(req, res);
		
		expect(res.redirect).to.have.been.calledWith(testOutboundUrl);
	});

	it('sends a 400 error if an outbound URL is not provided', () => {
		let res = { status: sinon.stub(), send: sinon.stub() };
		res.status.returns(res);
		const req = { query: {} };

		handleRedirectRequest(req, res);
		
		expect(res.status).to.have.been.calledWith(400);
		expect(res.send).to.have.been.calledWith({ error: "No URL provided to redirect to" });
	});

	it('publishes a link-clicked event when an outbound URL is provided', () => {
		const eventBody = {outboundUrl: 'http://test.com'};

		const res = { redirect: sinon.stub() };
		const req = { query: { outboundUrl: 'http://test.com' }};

		let publishStub = sinon.stub(streamClient, "publish");
		publishStub.resolves();

		handleRedirectRequest(req, res);
		
		expect(publishStub).to.have.been.calledWith('link-clicked', eventBody);
		
		publishStub.restore();
	});

	it('still redirects user but logs 500 error on failure to publish event', () => {
		const testOutboundUrl = 'http://test.com';
		const errorDetails = { status: 500, message: 'Failed to publish event'};

		const res = { redirect: sinon.stub() };
		const req = { query: { outboundUrl: 'http://test.com' }};

		let publishStub = sinon.stub(streamClient, "publish");
		publishStub.rejects();

		let logStub = sinon.stub(console, 'log');

		return handleRedirectRequest(req, res)
			.then(() => {
				expect(res.redirect).to.have.been.calledWith(testOutboundUrl);
				expect(console.log).to.have.been.calledWith(errorDetails);
			})
			.finally(() => {
				logStub.restore();
				publishStub.restore();
			});
	});
});