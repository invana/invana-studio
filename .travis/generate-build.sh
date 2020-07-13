echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker build -t invanalabs/graph-explorer .

if [ -z "$TRAVIS_TAG" ]
then
      DOCKER_TAG=$TRAVIS_TAG
else
      DOCKER_TAG=sha-`echo "$TRAVIS_COMMIT" | cut -c1-7`
fi

docker tag invanalabs/graph-explorer invanalabs/graph-explorer:"$DOCKER_TAG"
docker tag invanalabs/graph-explorer invanalabs/graph-explorer:latest
docker push invanalabs/graph-explorer:"$DOCKER_TAG"
docker push invanalabs/graph-explorer:latest