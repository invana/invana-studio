
# Invana Studio 
Open source knowledge graphs visualiser and editor.



[![Apache license](https://img.shields.io/badge/license-Apache-blue.svg)](https://github.com/invanalabs/invana-studio/blob/master/LICENSE) 
[![Build Status](https://travis-ci.org/invanalabs/invana-studio.svg?branch=master)](https://travis-ci.org/invanalabs/invana-studio)
[![Latest Demo](https://img.shields.io/badge/try%20demo-latest%20version-blue)](https://invana-studio-edge.herokuapp.com)
[![Stable Demo](https://img.shields.io/badge/try%20demo-stable%20version-blue)](https://invana-studio.herokuapp.com)
[![Docker pulls](https://img.shields.io/docker/pulls/invanalabs/invana-studio)](https://hub.docker.com/r/invanalabs/invana-studio)
[![Commit Activity](https://img.shields.io/github/commit-activity/m/invanalabs/invana-studio)](https://github.com/invanalabs/invana-studio/commits)



![](./screenshot.png)


## Setup Graph Explorer

```shell script.
docker run -p 8888:8888 -d --name invana-studio invanalabs/invana-studio
# This will start a invana-studio service at 8888 port. ex: http://localhost:8888
```

If you want to install invana-studio on Heroku 
[click here](https://heroku.com/deploy?template=https://github.com/invanalabs/invana-studio/tree/master).
 

> Graph Explorer uses [invana-engine](https://github.com/invanalabs/invana-engine) as the backend to 
connect to graph databases. Invana Engine is a GraphQL API for Apache TinkerPop supported graph databases.
Check here for information on how to setup invana-engine 

Refer [here](https://invana.io/get-started.html) for more information on how to setup invana-engine 
and JanusGraph for Graph Explorer.

## Todo

- [x] Visualiser
- [ ] Editor
- [ ] Insights

## Demos

- stable version - [invana-studio.herokuapp.com](http://invana-studio.herokuapp.com/)
- latest version - [invana-studio-edge.herokuapp.com](http://invana-studio-edge.herokuapp.com/)


 

## License

Apache License 2.0

## Support 

For any other assistance, please feel free to get in touch with me at hi[at]invana.io.
