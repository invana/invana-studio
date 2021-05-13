export const GRAPH_CANVAS_SETTINGS = {
    DefaultNodeBorderColor: "#121212",
    DefaultNodeLabelPropertyKey: "_id",
    DefaultNodeStrokeWidth: 2,
    DefaultNodeRadius: 15,
    DefaultNodeInShapeTextColor: "#dddddd", // inside the shape
    DefaultNodeLabelColor: "#dddddd",

    DefaultLinkLabelPropertyKey: "_label",
    DefaultLinkPathColor: 0xc9c9c9,
    DefaultLinkLabelColor: "#9c9c9c",
    DefaultLinkStrokeWidth: 2,

    DefaultInShapeHTMLFn: (node) => node.properties.name ? node.properties.name.substring(0, 10) : node.id,

    DefaultLabelVisibility: false,
    simulationAlpha: 0.8,
    linkCurvature: .85,


    DefaultElementTextColor: "#343434",
    DefaultElementUnHighlightColor: "#9e9e9e",


    DEFAULT_LINK_LABEL_FONT_SIZE : 12,
    // DEFAULT_LINK_LENGTH: 180,

    MAX_LABEL_LENGTH: 45,
    DEFAULT_NODE_IMAGE: "https://via.placeholder.com/50",
    DEFAULT_NODE_LABEL_FONT_SIZE: 16,
    DEFAULT_NODE_SHAPE_SIZE: 16
}
