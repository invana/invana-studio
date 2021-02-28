# Invana Studio Design


## Code Structure
- **graphics-store** [src/core/graphics-store.js] - in-memory store of the graphics elements, used 
to calculate neighbors for now, may be more can come later. or replace this
 with any graph computing framework for front-end. 
- **graph-simulator** [src/core/graph-simulator.js] - d3 based class to decide the spacial arrangement 
of the nodes in the canvas using d3.forceSimulation() method.
- **data-store** [src/core/data-store.js] - in-memory store of the graphql responses, vertices and edges 
data that should be rendered into the canvas. 
 
 
