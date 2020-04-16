class GremlinResponseHandlers {


    convert_property_to_json(property) {

        let _single_prop = property[0]
        if (_single_prop['@type'] !== "g:VertexProperty") {
            throw "Not a VertexProperty error. check if this is of g:VertexProperty type:: " + JSON.stringify(property);
        }
        let d = {};
        let value = _single_prop['@value'].value
        d[_single_prop['@value'].label] = (typeof value === "string") ? value : value['@value']
        return d;

    }


    convert_vertex_to_json(vtx) {
        if (vtx['@type'] !== "g:Vertex") {
            throw "Not a vertex error. check if this is of g:Vertex type:: " + JSON.stringify(vtx);
        }
        let d = {};
        let _this = this;
        d.id = vtx['@value'].id['@value'];
        d.label = vtx['@value'].label;
        let properties = vtx['@value'].properties;
        Object.keys(properties).forEach(function (key) {
            let property = properties[key];
            let _ = _this.convert_property_to_json(property)
            d[key] = _[key]
        });
        return d;

    }


    convert_edge_to_json(edg) {

    }


    process(response) {
        let request_id = response.request_id;
        let data = response.result.data;
        let items = data['@value'];
        let _this = this;
        let nodes = [];
        items.forEach(function (item) {
            if (item['@type'] === "g:Vertex") {
                let d = _this.convert_vertex_to_json(item);
                d['_type'] = "g:Vertex";
                nodes.push(d);
            } else if (item['@type'] === "g:Edge") {
                let d = _this.convert_edge_to_json(item);
                d['_type'] = "g:Edge";

                nodes.push(d);
            }
        })
        return nodes
    }
}