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


```shell script
// Create an index
mgmt = graph.openManagement()

desc = mgmt.getPropertyKey("name")
mixedIndex = mgmt.buildIndex("mixedExample", Vertex.class).addKey(desc).buildMixedIndex("search")
mgmt.commit()

// Rollback or commit transactions on the graph which predate the index definition
graph.tx().rollback()

// Block until the SchemaStatus transitions from INSTALLED to REGISTERED
report = ManagementSystem.awaitGraphIndexStatus(graph, "mixedExample").call()

// Run a JanusGraph-Hadoop job to reindex
mgmt = graph.openManagement()
mr = new MapReduceIndexManagement(graph)
mr.updateIndex(mgmt.getGraphIndex("mixedExample"), SchemaAction.REINDEX).get()

// Enable the index
mgmt = graph.openManagement()
mgmt.updateIndex(mgmt.getGraphIndex("mixedExample"), SchemaAction.ENABLE_INDEX).get()
mgmt.commit()

// Block until the SchemaStatus is ENABLED
mgmt = graph.openManagement()
report = ManagementSystem.awaitGraphIndexStatus(graph, "mixedExample").status(SchemaStatus.ENABLED).call()
mgmt.rollback()

```

### List Indexes

```shell script
mgmt = graph.openManagement()
mgmt.getGraphIndexes(Vertex.class)

```



### Remove Stalled Management instances:
 - https://stackoverflow.com/questions/54286971/update-action-reindex-cannot-be-invoked-for-index-with-status-installed