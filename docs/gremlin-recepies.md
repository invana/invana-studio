# Gremlin Recepies



### Create Index
```shell script

graph.tx().rollback() //Never create new indexes while a transaction is active
mgmt = graph.openManagement()
name = mgmt.getPropertyKey('name')
mgmt.buildIndex('byNameComposite', Vertex.class).addKey(name).buildCompositeIndex()
mgmt.commit()

//Wait for the index to become available
ManagementSystem.awaitGraphIndexStatus(graph, 'byNameComposite').call()


mgmt = graph.openManagement()
mgmt.updateIndex(mgmt.getGraphIndex("byNameComposite"), SchemaAction.ENABLE_INDEX).get()
mgmt.commit()


```


### List Indexes

```shell script
mgmt = graph.openManagement()
mgmt.getGraphIndexes(Vertex.class)

```