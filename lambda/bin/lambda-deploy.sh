#!/bin/bash

set -ex

PACKAGE_NAME=redirector

echo 'REMOVING DEV DEPENDENCIES'
yarn --production

echo 'PACKAGING THE CODE'
zip --quiet -r $PACKAGE_NAME.zip index.js src node_modules/ -x __tests__

echo 'UPLOADING TO S3'
aws s3 cp $PACKAGE_NAME.zip s3://rabblerouser-artefacts/lambdas/$PACKAGE_NAME.zip
