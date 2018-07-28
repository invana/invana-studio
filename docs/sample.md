

```
gremlin = graph.addVertex(label,'software','name','gremlin')
gremlin.property('created',2009)
blueprints = graph.addVertex(label,'software','name','blueprints')
gremlin.addEdge('dependsOn',blueprints)
blueprints.property('created',2010)

````