const createClient = require('@rabblerouser/stream-client');

const streamClientSettings = {
  publishToStream: process.env.STREAM_NAME || 'rabblerouser_stream',
  kinesisEndpoint: process.env.KINESIS_ENDPOINT,
  region: process.env.AWS_REGION || 'ap-southeast-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'FAKE',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'ALSO FAKE',
};

module.exports = createClient(streamClientSettings);
