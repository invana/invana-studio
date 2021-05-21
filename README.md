
# Invana Studio 
Open source graph visualiser.


[![Apache license](https://img.shields.io/badge/license-Apache-blue.svg)](https://github.com/invanalabs/invana-studio/blob/master/LICENSE) 
[![Build Status](https://travis-ci.org/invanalabs/invana-studio.svg?branch=master)](https://travis-ci.org/invanalabs/invana-studio)
[![Stable Demo](https://img.shields.io/badge/try%20demo-stable%20version-blue)](https://invana-studio.herokuapp.com)
[![Latest Demo](https://img.shields.io/badge/try%20demo-latest%20version-blue)](https://invana-studio-edge.herokuapp.com)
[![Docker pulls](https://img.shields.io/docker/pulls/invanalabs/invana-studio)](https://hub.docker.com/r/invanalabs/invana-studio)
[![Commit Activity](https://img.shields.io/github/commit-activity/m/invanalabs/invana-studio)](https://github.com/invanalabs/invana-studio/commits)


![screenshot](screenshot.png)


## Setup Invana Studio

```shell script.
docker run -p 8888:8888 -d --name invana-studio invanalabs/invana-studio
```
This will start a invana-studio service at 8888 port. ex: http://localhost:8888
 
> Invana Studio uses [Invana Engine](https://github.com/invanalabs/invana-engine) as the backend to 
connect to graph databases. Invana Engine is a GraphQL API for Apache TinkerPop supported graph databases.

Refer [documentation](https://docs.invana.io) for more information on how to setup invana-engine 
and JanusGraph for Invana Studio.
 
 

## License

Apache License 2.0

## Support 

For any other assistance, please feel free to get in touch at hi[at]invana.io.
