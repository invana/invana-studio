import DeSerializerBase from "./base";


export default class InvanaEngineDeSerializer extends DeSerializerBase {


    processItem(item) {
        return item;
    }

    separateVerticesAndEdges(data, ignoreManagement) {
        if (typeof ignoreManagement === "undefined") {
            ignoreManagement = true;
        }
        let vertices = [];
        let edges = [];
        if (!data) {
            data = []
        }
        data.forEach(function (d) {
            if (ignoreManagement) {
                if (d.type === "vertex" && d.label !== "InvanaManagement") {
                    vertices.push(d);
                } else if (d.type === "edge" && d.label !== "InvanaManagement") {
                    edges.push(d);
                }
            } else {
                if (d.type === "vertex") {
                    vertices.push(d);
                } else if (d.type === "edge") {
                    edges.push(d);
                }
            }
        });


        return {"nodes": vertices, "links": edges};
    }

    convertList2Json(items) {
        return items;
    }

}

