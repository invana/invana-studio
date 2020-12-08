# Graph Explorer

Open source Graph Data Visualiser for Apache TinkerPop supported Graph Databases.

[![Apache license](https://img.shields.io/badge/license-Apache-blue.svg)](https://github.com/invanalabs/graph-explorer/blob/master/LICENSE) 
[![Build Status](https://travis-ci.org/invanalabs/graph-explorer.svg?branch=master)](https://travis-ci.org/invanalabs/graph-explorer)
[![Latest Demo](https://img.shields.io/badge/try%20demo-latest%20version-blue)](https://graph-explorer-edge.herokuapp.com)
[![Stable Demo](https://img.shields.io/badge/try%20demo-stable%20version-blue)](https://graph-explorer.herokuapp.com)
[![Docker pulls](https://img.shields.io/docker/pulls/invanalabs/graph-explorer)](https://hub.docker.com/r/invanalabs/graph-explorer)
[![Commit Activity](https://img.shields.io/github/commit-activity/m/invanalabs/graph-explorer)](https://github.com/invanalabs/graph-explorer/commits)

**This project is under active development.** 

## Setup Graph Explorer

```shell script.
docker run -p 8888:8888 -d --name graph-explorer invanalabs/graph-explorer
# This will start a graph-explorer service at 8888 port. ex: http://localhost:8888
```

If you want to install graph-explorer on Heroku 
[click here](https://heroku.com/deploy?template=https://github.com/invanalabs/graph-explorer/tree/master).

> Graph Explorer uses [invana-engine](https://github.com/invanalabs/invana-engine) as the backend to 
connect to graph databases. Invana Engine is a GraphQL API for Apache TinkerPop supported graph databases.
Check here for information on how to setup invana-engine 

Refer [here](https://invana.io/get-started.html) for more information on how to setup invana-engine 
and JanusGraph for Graph Explorer.

## Screenshot
![1](./docs/screenshots/1.png)

 

## License

Apache License 2.0

## Support 

For any other assistance, please feel free to get in touch with me at hi[at]invana.io.
