# Graph Explorer

Open source, extendable data visualiser for Apache TinkerPop's Gremlin supported graph databases.

Live version of the demo is hosted on [heroku](https://graph-explorer.herokuapp.com/) 

Updates on Twitter | Medium | 

## Install on Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/invanalabs/graph-explorer/tree/master)

Get the UI graph-explorer server live in minutes. 
**Note:** You still need gremlin server running on your local or remote.
 
 
 
## Install using Docker

#### Use Image from Docker Hub

```shell script
# for stable release
docker run -p 8888:8888 -d --name graph-explorer invanalabs/graph-explorer:alpha

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

Please get in touch with me for any further assistance at hi[at]invana.io.
