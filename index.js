const redirect = require('./src/redirect');

exports.handler = (event, context, callback) => callback(null, redirect(event["queryStringParameters"]));
