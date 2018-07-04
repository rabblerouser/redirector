const redirect = require('../redirect');
const streamClient = require('../streamClient');

const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));
const expect = chai.expect;

describe('handleRedirectRequest', () => {
  it('sends a 400 error if an outbound URL is not provided', () => {
    const response = redirect({});
    expect(response.statusCode).to.eq(400);
    expect(response.body).to.eq("No URL provided to redirect to");
  });

  it('attempts to publish a link-clicked event when an outbound URL is provided', () => {
    const queryStringParams = {outboundUrl: 'http://test.com'};
    const publishStub = sinon.stub(streamClient, "publish");
    publishStub.resolves();
    redirect(queryStringParams);
    expect(publishStub).to.have.been.calledWith('link-clicked', queryStringParams);
    publishStub.restore();
  });

  it('redirects an incoming request when an outbound URL is provided and event publish succeeds', () => {
    const queryStringParams = {outboundUrl: 'http://test.com'};
    const publishStub = sinon.stub(streamClient, "publish");
    publishStub.resolves();
    const response = redirect(queryStringParams);
    expect(response.statusCode).to.eq(302);
    expect(response.headers.Location).to.eq(queryStringParams.outboundUrl);
    publishStub.restore();
  });

  it('redirects an incoming request when an outbound URL is provided and event publish fails', () => {
    const queryStringParams = {outboundUrl: 'http://test.com'};
    const publishStub = sinon.stub(streamClient, "publish");
    publishStub.rejects();
    const response = redirect(queryStringParams);
    expect(response.headers.Location).to.eq(queryStringParams.outboundUrl);
    publishStub.restore();
  });
});
