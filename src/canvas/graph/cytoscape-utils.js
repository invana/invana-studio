export function flattenProperties(node, isNode) {
    /*
    converts .properties into flat dictionary
     */
    const properties = node.properties || {};
    Object.keys(properties).forEach(function (key) {
        node[key] = properties[key];
    });
    delete node.properties;
    if (isNode) {
        node.metaShape = "ellipse";
        node.metaBgColor = "red"; // TODO -
        node.metaBgImage = null; // TODO -
    }
    return node;
}


export function deFlattenProperties(node, isNode) {
    const metaKeys = ["metaShape", "metaBgColor", "metaBgImage"];
    let mainKeys = [];
    if (isNode) {
        mainKeys = ["id", "label", "type"];
    } else {
        mainKeys = ["id", "label", "type", "target", "source"];
    }

    let newNode = {}
    newNode.meta = {}
    newNode.properties = {}
    Object.keys(node).forEach(function (key) {
        if (metaKeys.includes(key)) {
            newNode.meta[key] = node[key];
        } else if (mainKeys.includes(key)) {
            newNode[key] = node[key];
        } else {
            newNode.properties[key] = node[key];
        }
    });
    return newNode
}

