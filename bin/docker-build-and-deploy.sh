#!/bin/sh
set -e

docker login -u "$DOCKER_USER" -p "$DOCKER_PASSWORD"

docker build --pull -t rabblerouser/redirector:$TRAVIS_BUILD_NUMBER .
docker push rabblerouser/redirector