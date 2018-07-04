const streamClient = require('./streamClient');

const sendClickEvent = (outboundUrl) => {
  return streamClient.publish('link-clicked', {
    outboundUrl: outboundUrl
  }).catch(() => Promise.reject({status: 500, message: 'Failed to publish event'}));
};

const redirect = (queryStringParameters) => {
  if (queryStringParameters && queryStringParameters['outboundUrl']) {
    sendClickEvent(queryStringParameters['outboundUrl'])
      .catch((e) => console.log(e));
    return {
      "statusCode": 302,
      "headers": {
        "Location": queryStringParameters['outboundUrl']
      },
      "body": null,
      "isBase64Encoded": false
    }
  }
  return {
    "statusCode": 400,
    "headers": {
      "Content-Type": "application/json"
    },
    "body": "No URL provided to redirect to",
    "isBase64Encoded": false
  }
};

module.exports = redirect;
