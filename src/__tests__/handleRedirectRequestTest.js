const handleRedirectRequest = require('../handleRedirectRequest');
const streamClient = require('../streamClient');

const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));
var expect = chai.expect;

describe('handleRedirectRequest', () => {

	it('sends a 400 error if an outbound URL is not provided', () => {
		let res = { status: sinon.stub(), send: sinon.stub() };
		res.status.returns(res);
		const req = { query: {} };

		handleRedirectRequest(req, res);
		
		expect(res.status).to.have.been.calledWith(400);
		expect(res.send).to.have.been.calledWith({ error: "No URL provided to redirect to" });
	});

	it('attempts to publish a link-clicked event when an outbound URL is provided', () => {
		const eventBody = {outboundUrl: 'http://test.com'};

		const res = { redirect: sinon.stub() };
		const req = { query: { outboundUrl: 'http://test.com' }};

		let publishStub = sinon.stub(streamClient, "publish");
		publishStub.resolves();

		handleRedirectRequest(req, res);
		
		expect(publishStub).to.have.been.calledWith('link-clicked', eventBody);
		
		publishStub.restore();
	});

	it('redirects an incoming request when an outbound URL is provided and event publish succeeds', () => {
		const testOutboundUrl = 'http://test.com';
		const req = { query: { outboundUrl: 'http://test.com' }};
		const res = { redirect: sinon.stub() };

		let publishStub = sinon.stub(streamClient, "publish");
		publishStub.resolves();

		handleRedirectRequest(req, res);

		expect(res.redirect).to.have.been.calledWith(testOutboundUrl);

		publishStub.restore();
	});


	it('redirects an incoming request when an outbound URL is provided and event publish fails', () => {
		const testOutboundUrl = 'http://test.com';
		const req = { query: { outboundUrl: 'http://test.com' }};
		const res = { redirect: sinon.stub() };

		let publishStub = sinon.stub(streamClient, "publish");
		publishStub.rejects();

		handleRedirectRequest(req, res);

		expect(res.redirect).to.have.been.calledWith(testOutboundUrl);

		publishStub.restore();
	});
});
