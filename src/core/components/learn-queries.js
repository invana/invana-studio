export const q1CreateData = "// Adding data of type `Person`\n\n" +
    "person = g.addV('Person')\n" +
    ".property('name', 'Ravi Raja')\n" +
    ".iterate();\n\n" +
    "// Adding data of type `Project`\n\n" +
    "project = g.addV('Project')\n" +
    ".property('name', 'Graph Explorer')\n" +
    ".iterate();";

export const q2allData = "// Display the two nodes \n" +
    "g.V().limit(2).toList()";


export const q3 = "// this will update existing property and adds a new property.\n\n" +
    "g\n" +
    ".V()\n" +
    ".hasLabel('Person')\n" +
    ".has('name', 'Ravi Raja')\n" +
    ".property('name', 'rrmerugu')\n" +
    ".property('full_name', 'Ravi Raja Merugu')\n" +
    ".iterate()\n"


export const q4 = "// this will add a relation ship between Person and Project data.\n\n" +
    "g\n" +
    ".V()\n" +
    ".hasLabel('Person')\n" +
    ".has('name','rrmerugu')\n" +
    ".as('person')\n" +
    "\n" +
    ".V()\n" +
    ".hasLabel('Project')\n" +
    ".has('name','Graph Explorer')\n" +
    "\n" +
    ".addE('authored')\n" +
    ".from('person')\n" +
    ".property('since',2020).next();\n"


export const q5 ="// this will show all the nodes, edges and the links between. \n" +
    "\n" +
    "node=g.V().toList();\n" +
    "\n" +
    "edges = g\n" +
    ".V()\n" +
    ".bothE()\n" +
    ".dedup()\n" +
    ".toList();\n" +
    "\n" +
    "other_nodes = g\n" +
    ".V()\n" +
    ".bothE()\n" +
    ".otherV()\n" +
    ".dedup()\n" +
    ".toList();\n" +
    "[other_nodes,edges,node]"
