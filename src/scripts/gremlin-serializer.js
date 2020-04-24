class GremlinResponseHandlers {


    convert_vertex_property_to_json(property) {

        let _single_prop = property[0];
        if (_single_prop['@type'] !== "g:VertexProperty") {
            throw "Not a VertexProperty error. check if this is of g:VertexProperty type:: " + JSON.stringify(property);
        }
        let d = {};
        let value = _single_prop['@value'].value;
        d[_single_prop['@value'].label] = (typeof value === "string") ? value : value['@value'];
        return d;

    }


    convert_vertex_to_json(vtx) {
        if (vtx['@type'] !== "g:Vertex") {
            throw "Not a vertex error. check if this is of g:Vertex type:: " + JSON.stringify(vtx);
        }
        let d = {};
        d.type = "g:Vertex";
        let _this = this;
        d.id = vtx['@value'].id['@value'];
        d.label = vtx['@value'].label;
        let properties = vtx['@value'].properties;
        if (properties) {
            Object.keys(properties).forEach(function (key) {
                let property = properties[key];
                let _ = _this.convert_vertex_property_to_json(property);
                d[key] = _[key];
            });
        }

        return d;

    }


    convert_edge_property_to_json(property) {

        let _single_prop = property;
        if (_single_prop['@type'] !== "g:Property") {
            throw "Not a g:Property error. check if this is of g:Property type:: " + JSON.stringify(property);
        }
        let d = {};
        let value = _single_prop['@value'].value;
        d[_single_prop['@value'].key] = (typeof value === "string") ? value : value['@value'];
        return d;

    }


    convert_edge_to_json(edg) {
        if (edg['@type'] !== "g:Edge") {
            throw "Not a edge error. check if this is of g:Edge type:: " + JSON.stringify(edg);
        }
        let _this = this;
        let d = {};
        d.type = "g:Edge";
        d.label = edg['@value'].label;
        d.id = edg['@value'].id['@value'].relationId;
        d.inV = edg['@value'].inV['@value'];
        d.inVLabel = edg['@value'].inVLabel;
        d.outV = edg['@value'].outV['@value'];
        d.outVLabel = edg['@value'].outVLabel;

        let properties = edg['@value'].properties;

        if (properties) {
            Object.keys(properties).forEach(function (key) {
                let property = properties[key];
                let _ = _this.convert_edge_property_to_json(property);
                d[key] = _[key];
            });

        }

        return d;

    }


    convert_list_to_json(list_item) {

        if (list_item && "@type" in list_item) {
            if (list_item['@type'] !== "g:List") {
                throw "Not a List error. check if this is of g:List type:: " + JSON.stringify(list_item);
            }
        }
        let _this = this;
        let items = [];
        if (list_item && '@value' in list_item) {
            list_item['@value'].forEach(function (item) {
                let data_list = _this.process_item(item);
                data_list.forEach(function (datum) {
                    items.push(datum);
                });
            });
        }
        return items;

    }

    process_item(item) {
        // this is very useful to route to the respective renderers;
        let _this = this;
        if (item && '@type' in item) {
            if (item['@type'] === "g:Vertex") {
                let _ = _this.convert_vertex_to_json(item);
                return [_];
            } else if (item['@type'] === "g:Edge") {
                let _ = _this.convert_edge_to_json(item);
                return [_];
            } else if (item['@type'] === "g:List") {
                console.log("=======items", item);
                return _this.convert_list_to_json(item);
            }
        }

    }

    process(response) {
        let request_id = response.request_id;
        let data = response.result.data;
        return this.convert_list_to_json(data);
    }

    seperate_vertices_and_edges(data) {
        let vertices = [];
        let edges = [];
        if (data) {
            data.forEach(function (d) {
                if (d.type === "g:Vertex") {
                    vertices.push(d);
                } else if (d.type === "g:Edge") {
                    d.source = d.inV;
                    d.target = d.outV;
                    edges.push(d);
                }
            });
        }
        return [vertices, edges];
    }
}