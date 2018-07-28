

```
gremlin = graph.addVertex(label,'software','name','gremlin')
gremlin.property('created',2009)
blueprints = graph.addVertex(label,'software','name','blueprints')
gremlin.addEdge('dependsOn',blueprints)
blueprints.property('created',2010)

````


```
graph.addVertex(label,'animal','name','Bull Dog', 'animal_type', 'dog')
graph.addVertex(label,'animal','name','Doberman', 'animal_type', 'dog')
graph.addVertex(label,'animal','name','Shi tzu', 'animal_type', 'dog')
graph.addVertex(label,'animal','name','German Shepard', 'animal_type', 'dog')

```