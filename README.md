# Graph Explorer

Opensource Graph Data Visualiser for Tinkerpop supported Graph Databases.


## Install on Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/invanalabs/graph-explorer)

## Install using Docker

### Use Image from Docker Cloud

```shell script
docker run -p 8888:80 -d --name graph-explorer invanalabs/graph-explorer:test
```

### Build and Deploy from Code
```shell script
git clone git@github.com:invanalabs/graph-explorer.git
cd graph-explorer
docker build . -t invana-graph-explorer --build-arg GREMLIN_SERVER_URL="ws://127.0.0.1:8182/gremlin"
docker run -p 8888:80 -d invana-graph-explorer
``

![screenshot](./screenshot.png)
