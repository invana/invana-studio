# Developer Documentation


## importing graph of gods

```
graph = JanusGraphFactory.open('conf/janusgraph-cql-es.properties')
GraphOfTheGodsFactory.load(graph)
g = graph.traversal()
JanusGraphFactory.drop(graph)
```
