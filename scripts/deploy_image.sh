#!/bin/sh
# This script will 1.take tag input 2.builds and pushes docker image to docker registry.

if [ -z "$1" ]
  then
    echo "No tag name specified"
fi

cd ..
DOCKER_ACC=invanalabs
DOCKER_REPO=graph-explorer
IMG_TAG=$1
docker build -t $DOCKER_ACC/$DOCKER_REPO:"$IMG_TAG" .
docker push $DOCKER_ACC/$DOCKER_REPO:"$IMG_TAG"
