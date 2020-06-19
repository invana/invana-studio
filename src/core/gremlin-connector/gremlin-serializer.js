export default class GremlinResponseSerializers {


    convert_vertex_property_to_json(property) {

        let _single_prop = property[0];
        if (_single_prop['@type'] !== "g:VertexProperty") {
            throw new Error("Not a VertexProperty error. check if this is of g:VertexProperty type:: " + JSON.stringify(property));
        }
        let d = {};
        let value = _single_prop['@value'].value;
        d[_single_prop['@value'].label] = (typeof value === "string") ? value : value['@value'];
        return d;

    }


    convertVertex2Json(vtx) {
        if (vtx['@type'] !== "g:Vertex") {
            throw new Error("Not a vertex error. check if this is of g:Vertex type:: " + JSON.stringify(vtx));
        }
        let d = {};
        d.type = "g:Vertex";
        let _this = this;
        d.id = vtx['@value'].id['@value'];
        d.label = vtx['@value'].label;
        let properties = vtx['@value'].properties;
        d.properties = {}
        if (properties) {
            Object.keys(properties).forEach(function (key) {
                let property = properties[key];
                let _ = _this.convert_vertex_property_to_json(property);
                d.properties[key] = _[key];
            });
        }

        return d;

    }


    convert_edge_property_to_json(property) {

        let _single_prop = property;
        if (_single_prop['@type'] !== "g:Property") {
            throw new Error("Not a g:Property error. check if this is of g:Property type:: " + JSON.stringify(property));
        }
        let d = {};
        let value = _single_prop['@value'].value;
        d[_single_prop['@value'].key] = (typeof value === "string") ? value : value['@value'];
        return d;

    }


    convertEdge2Json(edg) {
        if (edg['@type'] !== "g:Edge") {
            throw new Error("Not a edge error. check if this is of g:Edge type:: " + JSON.stringify(edg));
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
        d.source = d.outV;
        d.target = d.inV;

        let properties = edg['@value'].properties;
        d.properties = {}
        if (properties) {
            Object.keys(properties).forEach(function (key) {
                let property = properties[key];
                let _ = _this.convert_edge_property_to_json(property);
                d.properties[key] = _[key];
            });

        }

        return d;

    }

    convertSet2Json(set_item) {

        if (set_item && "@type" in set_item) {
            if (set_item['@type'] !== "g:Set") {
                throw new Error("Not a g:Set error. check if this is of g:Set type:: " + JSON.stringify(set_item));
            }
        }
        let items = [];
        if (set_item && '@value' in set_item) {
            set_item['@value'].forEach(function (item) {
                // TODO - NOT IMPLEMENTED - because no use case found yet.
                // let data_list = _this.processItem(item);
                // data_list.forEach(function (datum) {
                //     items.push(datum);
                // });
            });
        }
        return items;

    }

    convertList2Json(list_item) {
        // console.log("convertList2Json list_item", list_item);
        if (list_item && "@type" in list_item) {
            if (list_item['@type'] !== "g:List") {
                throw new Error("Not a List error. check if this is of g:List type:: " + JSON.stringify(list_item));
            }
        }
        let _this = this;
        let items = [];
        if (list_item && '@value' in list_item) {
            list_item['@value'].forEach(function (item) {
                let data_list = _this.processItem(item);
                // console.log("data_list", data_list);
                data_list.forEach(function (datum) {
                    items.push(datum);
                });
            });
        }
        return items;

    }

    convertBulkset2Json(list_item) {
        // console.log("Bulkset", list_item);
        if (list_item && "@type" in list_item) {
            if (list_item['@type'] !== "g:BulkSet") {
                throw new Error("Not a g:BulkSet error. check if this is of g:BulkSet type:: " + JSON.stringify(list_item));
            }
        }
        let _this = this;
        let items = [];
        if (list_item && '@value' in list_item) {
            list_item['@value'].forEach(function (item) {
                let data_list = _this.processItem(item);
                // console.log("====datalist", data_list, item);
                data_list.forEach(function (datum) {
                    items.push(datum);
                });
            });
        }
        return items;

    }

    convertMap2Json(list_item) {

        if (list_item && "@type" in list_item) {
            if (list_item['@type'] !== "g:Map") {
                throw new Error("Not a g:Map error. check if this is of g:Map type:: " + JSON.stringify(list_item));
            }
        }
        let _this = this;
        let items = [];
        if (list_item && '@value' in list_item) {
            list_item['@value'].forEach(function (item) {
                let data_list = _this.processItem(item);
                data_list.forEach(function (datum) {
                    items.push(datum);
                });
            });
        }
        return items;

    }


    convertPath2Json(path_item) {

        if (path_item && "@type" in path_item) {
            if (path_item['@type'] !== "g:Path") {
                throw new Error("Not a g:Path error. check if this is of g:Path type:: " + JSON.stringify(path_item));
            }
        }
        let _this = this;
        let items = [];
        if (path_item && '@value' in path_item) {
            if ("objects" in path_item['@value']) {
                path_item['@value'].objects['@value'].forEach(function (item) {
                    let data_list = _this.processItem(item);
                    data_list.forEach(function (datum) {
                        items.push(datum);
                    });
                });
            } else if ("labels" in path_item['@value']) {
                path_item['@value'].labels['@value'].forEach(function (item) {
                    let data_list = _this.processItem(item);
                    data_list.forEach(function (datum) {
                        items.push(datum);
                    });
                });
            }
        }
        return items;

    }

    processItem(item) {
        // this is very useful to route to the respective renderers;
        let _this = this;
        // console.log("process item", typeof item, item);
        if (item && typeof item === "object" && '@type' in item) {
            if (item['@type'] === "g:Vertex") {
                let _ = _this.convertVertex2Json(item);
                return [_];
            } else if (item['@type'] === "g:Edge") {
                let _ = _this.convertEdge2Json(item);
                return [_];
            } else if (item['@type'] === "g:List") {
                // console.log("=======items", item);
                return _this.convertList2Json(item);
            } else if (item['@type'] === "g:Path") {
                // console.log("=======items", item);
                return _this.convertPath2Json(item);
            } else if (item['@type'] === "g:Set") {
                // console.log("=======items", item);
                return _this.convertSet2Json(item);
            } else if (item['@type'] === "g:BulkSet") {
                // console.log("=======items", item);
                return _this.convertBulkset2Json(item);
            } else if (item['@type'] === "g:Map") {
                // console.log("=======items", item);
                return _this.convertMap2Json(item);
            } else {
                return [];
            }
        } else {
            return [];
        }

    }

    process(response) {
        let data = response.result.data;
        return this.convertList2Json(data);
    }

    separateVerticesAndEdges(data, ignoreManagement) {
        if (typeof ignoreManagement === "undefined") {
            ignoreManagement = true;
        }
        let vertices = [];
        let edges = [];
        if (data) {
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
        }
        return {"nodes": vertices, "links": edges};
    }
}
