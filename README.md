# Graph Explorer

Opensource Graph Data Visualiser for Tinkerpop supported Graph Databases.


## Install via Docker

### Use Image from Docker Cloud

```shell script
docker run -p 8888:80 -d --name graph-explorer invanalabs/graph-explorer:test

```


### Build and Deploy from Code
```shell script
git clone git@github.com:invanalabs/graph-explorer.git
cd graph-explorer
npm install
npm build
docker build . -t invana-graph-explorer
docker run -p 8888:80 -d invana-graph-explorer 
```

