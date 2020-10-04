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
                if (d.type === "g:Vertex" && d.label !== "InvanaManagement") {
                    vertices.push(d);
                } else if (d.type === "g:Edge" && d.label !== "InvanaManagement") {
                    edges.push(d);
                }
            } else {
                if (d.type === "g:Vertex") {
                    vertices.push(d);
                } else if (d.type === "g:Edge") {
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

