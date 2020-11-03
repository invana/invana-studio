# Graph Explorer

Open source Graph Data Visualiser for Apache TinkerPop supported Graph Databases.

[![Apache license](https://img.shields.io/badge/license-Apache-blue.svg)](https://github.com/invanalabs/graph-explorer/blob/master/LICENSE) 
[![Build Status](https://travis-ci.org/invanalabs/graph-explorer.svg?branch=master)](https://travis-ci.org/invanalabs/graph-explorer)
[![Latest Demo](https://img.shields.io/badge/try%20demo-latest%20version-blue)](https://graph-explorer-edge.herokuapp.com)
[![Stable Demo](https://img.shields.io/badge/try%20demo-stable%20version-blue)](https://graph-explorer.herokuapp.com)
[![Docker pulls](https://img.shields.io/docker/pulls/invanalabs/graph-explorer)](https://hub.docker.com/r/invanalabs/graph-explorer)
[![Commit Activity](https://img.shields.io/github/commit-activity/m/invanalabs/graph-explorer)](https://github.com/invanalabs/graph-explorer/commits)

**This project is under active development.** 

## Installation

```shell script.
docker run -p 8888:8888 -d --name graph-explorer invanalabs/graph-explorer
# This will start a graph-explorer service at 8888 port. ex: http://localhost:8888
```

If you want to install graph-explorer on Heroku 
[click here](https://heroku.com/deploy?template=https://github.com/invanalabs/graph-explorer/tree/master).


## Connecting to Graph Explorer

Graph Explorer uses [invana-engine](https://github.com/invanalabs/invana-engine) as the backend to 
connect to graph databases. Invana Engine is a GraphQL API for Apache TinkerPop supported graph databases.

#### Deploying Invana-Engine
```shell script.
docker run -p 5000:5000 -d --name invana-engine invanalabs/invana-engine -e GREMLIN_SERVER_URL=ws://localhost:8182
# This will start an invana-engine service at 5000 port. ex: http://localhost:5000
```

Check more methods to connect to an authentication enabled gremlin server here.





1. wss://localhost:8182/gremlin - connect over ws/wss 
2. https://localhost:8182/gremlin - connect over http/https
3. https://user:password@awesome-proxy-domain.local/gremlin -  with basic authentication
4. https://access-or-session-token@awesome-proxy-domain.local/gremlin - with token based authentication

Apache TinkerPop's Gremlin Server does not handle Cross-origin resource sharing (CORS), for the 
obvious security reasons. But to access gremlin server from web browser you can use [gremlin proxy](https://github.com/invanalabs/gremlin-proxy). 
It is a Proxy layer for Apache TinkerPop's Gremlin Server to enable Cross-origin resource sharing (CORS).
 
 
Refer [documentation](https://invana.io/docs/graph-explorer/01-get-started) for more information.

## Screenshots
![1](./docs/screenshots/1.png)

![2](./docs/screenshots/2.png)

![3](./docs/screenshots/3.png)

![4](./docs/screenshots/4.png)

![5](./docs/screenshots/5.png)

![6](./docs/screenshots/6.png)


## License

Apache License 2.0

## Support 

For any further queries or dedicated support, please feel free to get in touch with me at hi[at]invana.io.
