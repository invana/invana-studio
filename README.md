# Graph Explorer

Open source, extendable data visualiser for Apache TinkerPop's Gremlin supported graph databases.

[![Apache license](https://img.shields.io/badge/license-Apache-blue.svg)](https://github.com/invanalabs/graph-explorer/blob/master/LICENSE) 
[![Build Status](https://travis-ci.org/invanalabs/graph-explorer.svg?branch=master)](https://travis-ci.org/invanalabs/graph-explorer)
[![Latest Demo](https://img.shields.io/badge/try%20demo-latest%20version-blue)](https://graph-explorer-edge.herokuapp.com)
[![Stable Demo](https://img.shields.io/badge/try%20demo-stable%20version-blue)](https://graph-explorer.herokuapp.com)
[![Docker pulls](https://img.shields.io/docker/pulls/invanalabs/graph-explorer)](https://hub.docker.com/r/invanalabs/graph-explorer)
[![Commit Activity](https://img.shields.io/github/commit-activity/m/invanalabs/graph-explorer)](https://github.com/invanalabs/graph-explorer/commits)

**Note:** You still need gremlin server running on your local or remote.

**This project is at Alpha Release currently, and expected 
to go into Beta in few weeks depending on the feed back
from the Community.** You can access live version of the demo hosted on heroku.


## Installation

#### Install on Heroku
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/invanalabs/graph-explorer/tree/master)

Get the UI graph-explorer server live in minutes. 
 
#### Deploy using Docker

```shell script.
# for latest release
docker run -p 8888:8888 -d --name graph-explorer invanalabs/graph-explorer
```
This will start a graph explorer service that can be accessed at 8888 port. ex: http://localhost:8888 

#### Connecting to Graph Explorer

You need a Apache TinkerPop Gremlin server running in your remote or local, connected to a graph database.
You can use something like JanusGraph 

##### connecting to server with No authentication enabled 
If you want to connect to an un authenticated gremlin server you can just use the following. 

```shell script
1. http://localhost:8182/gremlin - connect over http
2. ws://localhost:8182/gremlin - connect over ws 
```

You can choose which ever one makes more sense for you usecase.

#### connecting to server with Authentication enabled
 
```shell script
1. http://user:password@awesome-proxy-domain.local/gremlin  -   Basic Authentication
2. http://access-or-session-token@awesome-proxy-domain.local/gremlin - Token Based Authentication
3. http://awesome-proxy-domain.local/gremlin - No Authentication
```

Apache TinkerPop's Gremlin Server does not handle Cross-origin resource sharing (CORS), for the 
obvious security reasons I believe. But to access gremlin server from web browser we have created a 
[gremlin proxy](https://github.com/invanalabs/gremlin-proxy). 
It is a Proxy layer for Apache TinkerPop's Gremlin Server to enable Cross-origin resource sharing (CORS).
 
 


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
