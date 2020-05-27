cd ..
DOCKER_ACC=invanalabs
DOCKER_REPO=graph-explorer
IMG_TAG=test
docker build -t $DOCKER_ACC/$DOCKER_REPO:$IMG_TAG .
docker push $DOCKER_ACC/$DOCKER_REPO:$IMG_TAG
