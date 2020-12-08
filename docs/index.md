# Developer Documentation


## importing graph of gods

```shell script
cd /opt/janusgraph-0.5.2
./bin/gremlin.sh conf/gremlin-server/gremlin-server-cql-es.yaml
```

```
graph = JanusGraphFactory.open('conf/janusgraph-cql-es.properties')
GraphOfTheGodsFactory.load(graph)
g = graph.traversal()
JanusGraphFactory.drop(graph)
```
