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