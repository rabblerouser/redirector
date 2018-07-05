# redirector
*Rabble Rouser service that redirects URLs and sends events so that we know who's clicking on what.*

A service that sends a URL to the lambda function via the API Gateway. The lambda function redirects the user to the given URL and publishes the event to the Kinesis stream. This can be used to discover which users are clicking what links.

## Local Development

From the `lambda` subdirectory you can run `yarn simulate <some outbound URL>` to invoke the lambda locally with a URL with a mock lambda callback. To confirm that the event was published on the kinesis stream, you can check the `LOG` file in the `kinesis-data` directory in the `rabblerouser` repositor. The data in the file must be converted from base64 format using some type of converter such as [base64decode](https://www.base64decode.org/).

#### Example:
```bash
$ yarn simulate https://github.com/rabblerouser
```

### With Cage:

```bash
$ cage source mount redirector
$ cage up
$ cage run redirector yarn
$ cage run redirector yarn simulate <some outbound URL>
```

## Deployment

This application contains its own terraform code for deploying itself, which is a new pattern we're trying. However,
the terraform code here should not be run directly. Instead, it should be used as a module, which is invoked from the
main [infra repo](https://github.com/rabblerouser/infra). See that repo for instructions on how to deploy an entire
Rabble Rouser stack.