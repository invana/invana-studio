# Graph Explorer

Open source, extendable data visualiser for Apache TinkerPop's Gremlin supported graph databases.

This project is at Alpha Release currently, and expected 
to go into Beta in few weeks depending on the feed back
from the Community. You can access live version of the demo hosted on [heroku](https://graph-explorer.herokuapp.com/) 

**Note:** You still need gremlin server running on your local or remote.


## Install on Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/invanalabs/graph-explorer/tree/master)

Get the UI graph-explorer server live in minutes. 
 
 
 
## Install using Docker

#### Use Image from Docker Hub

```shell script.
# for latest release
docker run -p 8888:8888 -d --name graph-explorer invanalabs/graph-explorer

```

#### Build and Deploy from Code
```shell script
git clone git@github.com:invanalabs/graph-explorer.git
cd graph-explorer
docker build . -t invana-graph-explorer 
docker run -p 8888:8888 -d invana-graph-explorer
```

![screenshot](./screenshot.png)


## License

Apache License 2.0

## Support 

For any further queries or dedicated support, please feel free to get in touch with me at hi[at]invana.io.
