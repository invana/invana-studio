let response_data = {
    "nodes": [
        {
            "name": "Peter",
            "label": "Person",
            "id": 1
        },
        {
            "name": "Michael",
            "label": "Person",
            "id": 2
        },
        {
            "name": "Neo4j",
            "label": "Database",
            "id": 3
        },
        {
            "name": "Graph Database",
            "label": "Database",
            "id": 4
        }
    ],
    "edges": [
        {
            "source": 1,
            "target": 2,
            "type": "KNOWS",
            "since": 2010
        },
        {
            "source": 1,
            "target": 3,
            "type": "FOUNDED"
        },
        {
            "source": 2,
            "target": 3,
            "type": "WORKS_ON"
        },
        {
            "source": 3,
            "target": 4,
            "type": "IS_A"
        }
    ]
}
