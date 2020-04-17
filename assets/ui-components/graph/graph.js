class DataGraphCanvas {

    constructor(response_data) {
        this.width = 800;
        this.height = 600;
    }


    get_edges(edges, nodes) {
        let _edges = [];
        edges.forEach(function (elem) {
            elem['source'] = nodes.findIndex(function (node) {
                return node.id === elem['inV'];
            });
            elem['target'] = nodes.findIndex(function (node) {
                return node.id === elem['outV'];
            });
            elem['strength'] = 0.2;
            _edges.push(elem);
        })
        return this.get_edge_links(this.sort_edges(_edges));
    }

    sort_edges(edges) {
        edges.sort(function (a, b) {
            if (a.inV > b.inV) {
                return 1;
            } else if (a.inV < b.inV) {
                return -1;
            } else {
                if (a.outV > b.outV) {
                    return 1;
                }
                if (a.outV < b.outV) {
                    return -1;
                } else {
                    return 0;
                }
            }
        });
        return edges
    }

    get_edge_links(edges) {
        for (let i = 0; i < edges.length; i++) {
            if (i === 0) {
                edges[i].linknum = 1;
            } else if (i !== 0 &&
                edges[i].inV === edges[i - 1].inV &&
                edges[i].outV === edges[i - 1].outV) {
                edges[i].linknum = edges[i - 1].linknum + 1;
            } else if (i !== 0) {
                edges[i].linknum = edges[i - 1].linknum + 1;
            }
        }
        return edges
    }

    create_d3_canvas() {

    }

    setup_tool_tip() {
        let tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function (d) {
                if (d.type === "vertex")
                    return "<strong>Shop:</strong> <span>" + d.properties.title[0].value + "</span> <br> <strong>Id:</strong> <span>" + d.properties.id[0].value + "</span> <br> <strong>Rating:</strong> <span>" + d.properties.rating[0].value + "</span> <br> <strong>Address:</strong> <span>" + d.properties.address[0].value + "</span>";
                else if (d.type === "edge")
                    return "<strong>From:</strong> <span>" + d.source.properties.id[0].value + "</span> <br> <strong>To:</strong> <span>" + d.target.properties.id[0].value + "</span>"//" <br> <strong>Rating:</strong> <span>" + d.properties.rating[0].value + "</span> <br> <strong>Address:</strong> <span>" + d.properties.address[0].value + "</span>"
            })
        return tip
    }

    setup_svg() {
        let svg = d3.select("#svg").attr("class", "svg_cls")
        // Per-type markers, as they don't inherit styles.
        svg.append("defs").selectAll("marker")
            .data(["a"])
            .enter().append("marker")
            .attr("id", 'marker_arrow')
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 15)
            .attr("refY", -1.5)
            .attr('markerUnits', 'userSpaceOnUse')
            .attr("markerWidth", 10)
            .attr("markerHeight", 10)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5");
        return svg;
    }




    transform(d) {
        return "translate(" + d.x + "," + d.y + ")";
    }


    getAdjacentNodeIds(nodeId, LINK_ID_TO_LINK, NODE_ID_TO_LINK_IDS) {
        let connectedLinkIds = NODE_ID_TO_LINK_IDS[nodeId] || new Set()
        let data = new Set([nodeId])
        connectedLinkIds.forEach(linkId => {
            let link = LINK_ID_TO_LINK[linkId]
            data.add(link.source.id)
            data.add(link.target.id)
        })
        return data
    }


    getAdjacentLinkIds(nodeId, NODE_ID_TO_LINK_IDS) {
        return NODE_ID_TO_LINK_IDS[nodeId] || new Set()
    }

    onNodeHoverIn(selectedNode, svg, LINK_ID_TO_LINK, NODE_ID_TO_LINK_IDS) {
        let nodeElements = svg.selectAll('circle')
        let linkElements = svg.selectAll('.link')

        let adjacentNodeIds = this.getAdjacentNodeIds(selectedNode.id, LINK_ID_TO_LINK, NODE_ID_TO_LINK_IDS)
        nodeElements.style('opacity', function (nodeElement) {
            return adjacentNodeIds.has(nodeElement.id) ? '1' : '0.1'
        })

        let adjacentLinkIds = this.getAdjacentLinkIds(selectedNode.id, NODE_ID_TO_LINK_IDS)
        linkElements.style('opacity', function (linkElement) {
            return adjacentLinkIds.has(linkElement.id) ? '1' : '0.1'
        })

        // tip.show(selectedNode)
    }

    onNodeHoverOut(selectedNode, svg, tip) {
        let nodeElements = svg.selectAll('circle')
        let linkElements = svg.selectAll('.link')

        nodeElements.style('opacity', '1')
        linkElements.style('opacity', '1')

        tip.hide(selectedNode)
    }

    onLinkMoveHover(selectedLink, svg, LINK_ID_TO_LINK) {
        let nodeElements = svg.selectAll('circle')
        let linkElements = svg.selectAll('.link')
        linkElements.style('opacity', function (linkElement) {
            return selectedLink.id === linkElement.id ? '1' : '0.1'
        })


        let linkData = LINK_ID_TO_LINK[selectedLink.id]
        let adjacentNodeIds = new Set([linkData.source.id, linkData.target.id])
        nodeElements.style('opacity', function (nodeElement) {
            return adjacentNodeIds.has(nodeElement.id) ? '1' : '0.1'
        })


        d3.select('#' + selectedLink.id).style('stroke-width', 4)

    }

    onLinkMoveOut(selectedLink, svg) {
        let nodeElements = svg.selectAll('circle')
        let linkElements = svg.selectAll('.link')

        nodeElements.style('opacity', '1')
        linkElements.style('opacity', '1')


        d3.select('#' + selectedLink.id).style('stroke-width', 2)

    }

    setup_force(nodes, edges) {
        return d3.layout.force()
            .gravity(0.01)
            .distance(500)
            .charge([-50])
            .linkDistance(250)
            .size([this.width, this.height])
            .nodes(nodes)
            .links(edges)
            .start();
    }

    setup_legend(svg, nodes){
        var legend = svg.append("g")
                .attr("class", "legend")
                .attr("height", 0)
                .attr("width", 0)
                .attr('transform', 'translate(20,250)');


            var legend_list = [];
            for (let i = 0; i < nodes.length; i++) {
                for (let j = 0; j < nodes.length; j++) {
                    if (nodes[i].label === nodes[j].label && legend_list.indexOf(nodes[i].label) === -1) {
                        legend_list.push(nodes[i].label);
                    }
                }
            }
            // var legend_nodes = d3.selectAll('.symbol');


            // console.log("legend_list array: ", legend_list, legend_nodes);
            // legend_nodes.remove()

            // d3.selectAll('.symbol').remove()

            svg.selectAll('.symbol')
                .data(legend_list)
                // .attr('class','symbol')
                .enter()
                .append('circle')
                .attr('class', 'symbol')
                .attr('transform', function (d, i) {
                    return 'translate(' + (20) + ',' + ((i * 20) + 10) + ')';
                })
                .attr('r', 10)
                .style("fill", function (d) {
                    //   return "black";
                    if (d === "Customers") {
                        return "blue";
                    }
                    else if (d === "Countries") {
                        return "green";
                    }
                    else if (d === "Profiles") {
                        return "pink";
                    }
                    else if (d === "Hotels") {
                        return "red";
                    }
                    else if (d === "Restaurants") {
                        return "violet";
                    }
                    else if (d === "Monuments") {
                        return "indigo";
                    }
                    else if (d === "Castles") {
                        return "yellow";
                    }
                    else if (d === "Theatres") {
                        return "orange";
                    }
                    else if (d === "ArchaeologicalSites") {
                        return "black";
                    }
                    else if (d === "Reviews") {
                        return "cyan";
                    }
                    else if (d === "Orders") {
                        return "lavender";
                    }
                });

            // d3.selectAll('.label').exit().remove();
            svg.selectAll('.label')
                .data(legend_list)
                .enter()
                .append('text')
                .attr("x", "40")
                .attr("y", function (d, i) {
                    return ((i * 20) + 15);
                })
                .text(function (d) {
                    return d;
                });


    }

    setup_graph_canvas(nodes, edges) {
        let _this = this;
        let svg = this.setup_svg()
        // var edges = [];
        let fill = d3.scale.category10();

        let force = this.setup_force(nodes, edges)
        let tip = this.setup_tool_tip()


        let LINK_ID_TO_LINK = function () {
            let data = {}
            edges.forEach(edge => {
                data[edge.id] = edge
            })
            return data
        }()


        this.setup_legend(svg, nodes);

        let NODE_ID_TO_LINK_IDS = function () {
            let data = {}
            edges.forEach(edge => {
                data[edge.source.id] = data[edge.source.id] || new Set()
                data[edge.target.id] = data[edge.target.id] || new Set()
                data[edge.source.id].add(edge.id)
                data[edge.target.id].add(edge.id)
            })
            return data
        }()


        // console.log(tip.document)
        svg.call(tip);

        let links = svg.append("g").selectAll("g")
            .data(edges).enter()
            .append('g')
            .attr('class', 'link')

        let paths = links
            .append("path")
            .attr('id', data => data.id)
            .attr("class", "link.path")
            .attr('fill', 'none')
            .attr('marker-end', 'url(#marker_arrow)')
            .attr('r', 5)
            .style('stroke-width', 2)
            .style("stroke", function (node) {
                if (node.label === "near_by") {
                    return "violet"
                } else if (node.label === "far_away") {
                    return "indigo"
                } else if (node.label === "near_to") {
                    return "blue"
                } else if (node.label === "near_boy") {
                    return "green"
                } else if (node.label === "near_byo") {
                    return "yellow"
                } else if (node.label === "far_by") {
                    return "orange"
                }
            })
            .on('mouseover', function (d) {
                tip.show(d);
                _this.onLinkMoveHover(d, svg, LINK_ID_TO_LINK);
            })
            .on('mouseout', function (d) {
                tip.hide(d);
                _this.onLinkMoveOut(d, svg);
            })

        let labels = links
            .append('text')
            .append('textPath')
            .attr('id', data => 'label-' + data.id)
            // .attr("x", d => (d.source.y + d.target.y) / 2)
            // .attr("y", d => (d.source.x + d.target.x) / 2)
            // .attr("text-anchor", "middle")
            .text(d => d.label);

        var node = svg.selectAll("node")
            .data(nodes)
            .enter().append("g")
            .attr('id', data => data.id)
            .attr("class", "node")
            .style("fill", function (d) {
                if (d.label === "Shop") {
                    return "blue";
                } else if (d.label === "Address") {
                    return "orange";
                }
                // return fill(d.group);
            })
            .call(force.drag)
            .on("mouseover", function (d) {
                tip.show(d);
                _this.onNodeHoverIn(d, svg, LINK_ID_TO_LINK, NODE_ID_TO_LINK_IDS);
            })
            .on("mouseout", function (d) {
                tip.hide(d);
                _this.onNodeHoverOut(d, svg, tip);
            })
            .on("click", function (d, i) {
                svg.selectAll(".node").style("fill", function (d) {
                    return fill(d.group);
                });
                d3.select(".menu").remove();

                var thisNode = d3.select(this);
                // thisNode.attr('r', 25).style("fill", "lightcoral");

                var menuDataSet = [{
                    id: 101,
                    size: 2,
                    label: "Item 1"
                }, {
                    id: 102,
                    size: 1,
                    label: "Item 2"
                }, {
                    id: 103,
                    size: 65,
                    label: "Item 3"
                }, {
                    id: 104,
                    size: 45,
                    label: "Item 4"
                }];

                // Barvy menu
                var color = d3.scale.category20();
                var pie = d3.layout.pie()
                    .sort(null)
                    .value(function (d) {
                        return Object.keys(menuDataSet).length;
                    }); // zde je nutnÃ© zadat celkovou populaci - poÄetz prvkÅ¯ v

                // Menu
                var widthMenu = 180,
                    heightMenu = 180,
                    radiusMenu = Math.min(widthMenu, heightMenu) / 2;

                // Arc setting
                var arc = d3.svg.arc()
                    .innerRadius(radiusMenu - 70)
                    .outerRadius(radiusMenu - 25);

                // Graph space
                var svgMenu = thisNode.append("svg")
                    .attr("width", widthMenu)
                    .attr("height", heightMenu)
                    .attr("class", "menu")
                    .attr("x", -90)
                    .attr("y", -90)
                    .append("g")
                    .attr("transform", "translate(" + widthMenu / 2 + "," + heightMenu / 2 + ")");


                // Prepare graph and load data
                var g = svgMenu.selectAll(".arc")
                    .data(pie(menuDataSet))
                    .enter().append("g")
                    .attr("class", "arc")
                    .on("click", function (node) {
                        console.log("You clicked on: ", node.data.label, " and its id is: ", node.data.id);
                        console.log("Its node is: ", d.properties.id[0].value);
                    });
                // .on("mouseover", function(d) {tip.hide(d);});

                // Add colors
                var path = g.append("path")
                    .attr("d", arc)
                    .attr("fill", function (d) {
                        return color(d.data.size);
                    })

                // Add labels
                var asdfd = g.append("text")
                    .attr("transform", function (d) {
                        return "translate(" + arc.centroid(d) + ")";
                    })
                    .attr("dy", ".35em")
                    .style("text-anchor", "middle")
                    .text(function (d) {
                        return d.data.label;
                    }).on("mouseenter", tip.hide);


                // Add hover action
                path.on("mouseenter", function (d, i) {
                    tip.hide(d);
                    var thisPath = d3.select(this);
                    thisPath.attr("fill", "blue")
                        .attr("cursor", "pointer")
                        .attr("class", "on");
                })

                path.on("mouseout", function (d) {
                    d3.select(this)
                        .attr("fill", function (d) {
                            return color(d.data.size);
                        })
                        .attr("class", "off");
                });

            });


        svg.selectAll("*:not(.node)").on("click", function (d) {
            console.log(d);
            svg.selectAll(".menu").remove();
        })

        /*
          node.append("image")
              .attr("xlink:href", "https://github.com/favicon.ico")
              .attr("x", -8)
              .attr("y", -8)
              .attr("width", 16)
              .attr("height", 16);
        */
        node.append("circle").attr("r", 10).attr("class", "node_data");
        node.append("text")
            .attr("dx", 12)
            .attr("dy", ".35em")
            .text(function (d) {
                return d.properties.title[0].value


            });


        force.on("tick", function () {

            paths.attr("d", function (data) {
                let x1 = data.source.x,
                    y1 = data.source.y,
                    x2 = data.target.x,
                    y2 = data.target.y;

                let dr = -720 / data.linknum;
                // console.log(dr);
                return `M ${x1},${y1} A${dr},${dr} 0 0,1 ${x2},${y2}`
            });

            node.attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

            labels.attr("xlink:href", data => '#' + data.id)
                .style("text-anchor", "middle")
                .attr("startOffset", "50%")


        });


    }


    render_graph(response_data) {

        let nodes = response_data.result.data[0];
        let edges = this.get_edges(response_data.result.data[1], nodes);
        this.setup_graph_canvas(nodes, edges)
    }


}

