const lambda = require('./index.js');

const lambdaCallback = (err, result) => (
  err ? console.error('Lambda failed:', err.message) : console.log('Lambda succeeded:', result)
);

const outboundUrl = process.argv[2];

if (!outboundUrl) {
  console.error('Please provide the outbound URL');
  process.exit(1);
}

const event = { queryStringParameters: { outboundUrl: outboundUrl } };

lambda.handler(event, null, lambdaCallback);
