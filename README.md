# graph.js

Library for building Knowledge Graph UIs for the responses from Gremlin servers (Apache Tinkerpop standards)


## Usage 

```html

<!doctype html>
<html lang="en">
<head>
    <link rel="stylesheet" href="http://localhost:8081/dist/graph.css">
    <title>Graph UI</title>
</head>
<body>
<div id="graph-ui"></div>
</body>
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script src="https://d3js.org/d3.v4.min.js" type="text/javascript"></script>
<script src="https://d3js.org/d3-selection-multi.v1.js"></script>
<script src="http://localhost:8081/dist/graph.min.js"></script> 
<script>
    $(document).ready(function () {
        let gremlin_url = "ws://127.0.0.1:8182/gremlin";
        let canvas_selector = "#graph-ui";
        let graph = new InvanaKnowledgeGraphUI(gremlin_url, canvas_selector)
        graph.start();
    });
</script>
</html>

```


## Internal Events 
Currently these control to these events are not given to the user, 
- onQueryResponseReceived 
- onNodeHoverin
- onNodeHoverOut
- onNodeClick
- onLinkHoverin
- onLinkHoverOut
- onLinkClick

## Controls

- Controls.Center
- Controls.Zoom


