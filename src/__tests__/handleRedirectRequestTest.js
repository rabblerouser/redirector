const handleRedirectRequest = require('../handleRedirectRequest');
const streamClient = require('../streamClient');

const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));
var expect = chai.expect;

it('redirects an incoming request when an outbound URL is provided', () => {
	const testOutboundUrl = 'http://test.com';
	const req = { query: { outboundUrl: 'http://test.com' }};
	const res = { redirect: sinon.stub() };

	handleRedirectRequest(req, res);
	
	expect(res.redirect).to.have.been.calledWith(testOutboundUrl);
});

it('sends a 400 error if an outbound URL is not provided', () => {
	const testOutboundUrl = 'http://test.com';
	let res = { status: sinon.stub(), send: sinon.stub() };
	res.status.returns(res);
	const req = { query: {} };

	handleRedirectRequest(req, res);
	
	expect(res.status).to.have.been.calledWith(400);
	expect(res.send).to.have.been.calledWith({ error: "No URL provided to redirect to" });
});