import * as d3 from 'd3';
import {
    DefaultCanvasBackgroundColor,
    nodeRadius,
    nodeStrokeWidth,
    linkDistance,
    linkCurvature,
    linkStrokeWidth,
    linkFillColor,
    linkTextColor

} from "../../config";


export default function InvanaGraphUI(
    canvasHTMLSelector,
    nodesData,
    linksData,
    // node methods
    onNodeMouseOver,
    onNodeMouseOut,
    onNodeClick,
    // link methods
    onLinkMouseOver,
    onLinkMouseOut,
) {
    d3.select(canvasHTMLSelector).selectAll("*").remove();
    const svg = d3.select(canvasHTMLSelector).style("background-color", DefaultCanvasBackgroundColor);
    const everything = svg.append("g").attr("class", "everything");
    const linksG = everything.append("g").attr("class", "links");
    const nodesG = everything.append("g").attr("class", "nodes");
    const htmlSelector = document.querySelector(canvasHTMLSelector);
    const clientWidth = htmlSelector.clientWidth;
    const clientHeight = htmlSelector.clientHeight;


    const simulation = d3.forceSimulation()
        // .force("link", d3.forceLink().id(d => d.id))
        .force("center", d3.forceCenter(clientWidth / 2, clientHeight / 2))
        .force('charge', d3.forceManyBody().strength(0))
        .force('collide', d3.forceCollide(100));


    let links = linksG
        .selectAll("g")
        .data(linksData)
        .enter().append("g")
        .attr("cursor", "pointer")

    const linkPaths = links
        .append("path")
        .attr("id", function (d, i) {
            return "link-" + i;
        })
        .attr("association-id", function (d, i) {
            return "link-" + d.target + "-" + d.source;
        })
        .attr("sameIndexCorrected", function (d, i) {
            return d.sameIndexCorrected;
        })
        .attr('stroke', linkFillColor)
        .attr("stroke-width", linkStrokeWidth)
        .attr("fill", "transparent")
        .attr('marker-end', (d, i) => 'url(#link-arrow-' + i + ')')
        .on("mouseover", (d) => onLinkMouseOver ? onLinkMouseOver(d) : console.log("No onLinkMouseOver action set."))
        .on("mouseout", (d) => onLinkMouseOut ? onLinkMouseOut(d) : console.log("No onLinkMouseOut action set."));


    const linkText = links
        .append("text")
        .attr("dy", -4)
        .append("textPath")
        .attr("xlink:href", function (d, i) {
            return "#link-" + i;
        })
        .style("text-anchor", "middle")
        .attr("startOffset", "50%")
        .attr('fill', linkTextColor) // TODO add .meta for links also
        .attr('stroke', linkTextColor)
        .text((d, i) => `${d.label || d.id}`);

    let nodes = nodesG
        .selectAll("g")
        .data(nodesData)
        .enter().append("g")
        .attr("id", (d)=> "node-" + d.id)
        .attr("cursor", "pointer")
        .attr("class", "node")
        .call(d3.drag()
            .on("start", dragStarted)
            .on("drag", dragged)
            .on("end", dragEnded))
        .on("mouseover", (d) => onNodeMouseOver ? onNodeMouseOver(d) : console.log("No onNodeMouseOver action set."))
        .on("mouseout", (d) => onNodeMouseOut ? onNodeMouseOut(d) : console.log("No onNodeMouseOut action set."))
        .on("click", (d) => onNodeClick ? onNodeClick(d) : console.log("No onNodeClick action set."))

    // node first circle
    nodes.append("circle")
        .attr("r", (d) => d.meta.shapeOptions.radius)
        .attr("fill", (d) => d.meta.shapeOptions.fillColor)
        .attr("stroke", (d) => d.meta.shapeOptions.strokeColor)
        .attr("stroke-width", (d) => d.meta.shapeOptions.strokeWidth);


    // for bgImageUrl
    nodes.append('g')
        .attr("class", "bgImageUrl")
        .attr('transform', function (d) {
                const side = 2 * d.meta.shapeOptions.radius * Math.cos(Math.PI / 4);
                const dx = -1 * (side / 2) * 1.5;
                // const dx = d.meta.shapeOptions.radius - (side / 2) * (2.5);
                // const dy = d.meta.shapeOptions.radius - (side / 2) * (2.5) * (2.5 / 3) - 4;
                return 'translate(' + [dx, dx] + ')'
            }
        )
        .append("foreignObject")
        .attr("width", (d) => 2 * d.meta.shapeOptions.radius * Math.cos(Math.PI / 4) * 2) // side
        .style("font-size", function (d) {
            return "12px";
        })
        .attr("height", (d) => 2 * d.meta.shapeOptions.radius * Math.cos(Math.PI / 4) * 2) // side
        .append("xhtml:body")

        .style("background-color", "transparent")
        .append("xhtml:span")
        .style("color", (d) => d.meta.shapeOptions.textColor)
        .style("background-color", "transparent")
        .style("padding-top", (d) => d.meta.shapeOptions.radius / 4)
        .html(function (d) {
            const side = 2 * d.meta.shapeOptions.radius * Math.cos(Math.PI / 4) * 1.5;
            if (d.meta.bgImageUrl) {
                return "<img src='" + d.meta.bgImageUrl + "' style='width: " + side + "px; border-radius: 3rem;' />"
            }
        })

    // node bgImageUrl CAP ; this will create a border ring around the image on top of it. creating clean UI
    nodes.append("circle")
        .attr("class", "bgImageUrlCap")
        .attr("r", (d) => d.meta.shapeOptions.radius)
        .attr("fill", "transparent")
        .attr("stroke", (d) => d.meta.shapeOptions.strokeColor)
        .attr("stroke-width", (d) => d.meta.shapeOptions.strokeWidth + 1);


    // for nodeBgHtml - this will be on top of background image
    nodes.append('g')
        .attr("class", "nodeHTML")
        .attr('transform', function (d) {
                const side = 2 * d.meta.shapeOptions.radius * Math.cos(Math.PI / 4);
                const dx = -1 * (side / 2);
                // const dx = d.meta.shapeOptions.radius - (side / 2) * (2.5);
                // const dy = d.meta.shapeOptions.radius - (side / 2) * (2.5) * (2.5 / 3) - 4;
                return 'translate(' + [dx, dx] + ')'
            }
        )
        .append("foreignObject")
        .attr("width", (d) => 2 * d.meta.shapeOptions.radius * Math.cos(Math.PI / 4)) // side
        .style("font-size", function (d) {
            return "12px";
        })
        .attr("height", (d) => 2 * d.meta.shapeOptions.radius * Math.cos(Math.PI / 4)) // side
        .append("xhtml:body")
        .style("color", (d) => d.meta.shapeOptions.textColor)
        .style("font-size", "16px") // make this dynamic based on the node radius also
        // .style("font-weight", "bold")
        .style("background-color", "transparent")
        .append("xhtml:span")
        .style("text-align", "center")
        .style("display", "block")
        .style("vertical-align", "middle")

        .style("color", (d) => d.meta.shapeOptions.textColor)
        .style("background-color", "transparent")
        .style("padding-top", (d) => d.meta.shapeOptions.radius / 4)
        .html(function (d) {
            if (d.meta.shapeOptions.inShapeHTML && !d.meta.bgImageUrl) {
                return d.meta.shapeOptions.inShapeHTML
            }
        });

    //
    nodes.append('g')
        .attr("class", "tagHTML")
        .attr('transform', function (d) {
                const side = 2 * d.meta.shapeOptions.radius * Math.cos(Math.PI / 4);
                const dx = (side / 2);
                // const dx = d.meta.shapeOptions.radius - (side / 2) * (2.5);
                // const dy = d.meta.shapeOptions.radius - (side / 2) * (2.5) * (2.5 / 3) - 4;
                return 'translate(' + [dx, dx - (d.meta.shapeOptions.radius / 4) + d.meta.shapeOptions.strokeWidth] + ')'
            }
        )
        .append("foreignObject")
        .attr("width", (d) => 2 * d.meta.shapeOptions.radius * Math.cos(Math.PI / 4)) // side
        .style("font-size", function (d) {
            return "12px";
        })
        .attr("height", (d) => 2 * d.meta.shapeOptions.radius * Math.cos(Math.PI / 4)) // side
        .append("xhtml:body")
        .style("color", (d) => d.meta.shapeOptions.textColor)
        .style("font-size", "16px") // make this dynamic based on the node radius also
        // .style("font-weight", "bold")
        .style("background-color", "transparent")
        .append("xhtml:span")
        .style("color", (d) => d.meta.shapeOptions.textColor)
        .style("background-color", "transparent")
        .html((d) => "<i class=\"fas fa-globe-africa\"></i>");


    nodes.append("title")
        .text(function (d) {
            return d.meta.labelOptions.labelText || d.id;
        })
    nodes.append("text")
        .attr("dy", -16)
        .attr("dx", 6)
        .text((d) => d.meta.labelOptions.labelText || d.id)
        .attr("stroke", (d) => d.meta.labelOptions.labelColor)
        .attr("fill", (d) => d.meta.labelOptions.labelColor)
        .style("font-size", (d) => "12px")
        .style("display", (d) => (d.meta.labelOptions.showLabel) ? "block" : "none")
    // .style("text-shadow", function (d, i) {
    //     return "1px 1px " + d3.rgb(d.meta.labelOptions.labelColor).darker(1);
    // });


    linksG.append("svg:defs").selectAll("marker")
        .data(linksData)
        .enter()
        .append("svg:marker")
        .attr("id", (d, i) => "link-arrow-" + i)
        .attr("viewBox", "0 -5 10 10")
        .attr("refY", 0)
        .attr("refX", (d, i) => (nodeRadius - (nodeRadius / 4) + nodeStrokeWidth))
        .attr("fill", (d) => linkFillColor)
        .attr("stroke", (d) => linkFillColor)
        .attr("markerWidth", 10)
        .attr("markerHeight", 10)
        .attr("orient", "auto")

        .append("svg:path")
        .attr("d", "M0,-5L10,0L0,5");

    simulation
        .nodes(nodesData)
        .on("tick", ticked);

    simulation.force("link", d3.forceLink().links(linksData)
        .id((d, i) => d.id)
        .distance(linkDistance));


    function linkArc(d) {
        let dx = (d.target.x - d.source.x),
            dy = (d.target.y - d.source.y),
            dr = Math.sqrt(dx * dx + dy * dy),
            unevenCorrection = (d.sameUneven ? 0 : 0.5),
            arc = ((dr * d.maxSameHalf) / (d.sameIndexCorrected - unevenCorrection)) * linkCurvature;
        if (d.sameMiddleLink) {
            arc = 0;
        }
        return "M" + d.source.x + "," + d.source.y + "A" + arc + "," + arc + " 0 0," + d.sameArcDirection + " " + d.target.x + "," + d.target.y;
    }

    function ticked() {
        linkPaths.attr("d", (d) => linkArc(d))
        nodes
            .attr("transform", d => `translate(${d.x}, ${d.y})`);
    }

    function dragStarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.8).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragEnded(d) {
        if (!d3.event.active) simulation.alphaTarget(0.8);
        d.fx = null;
        d.fy = null;
    }


    svg.call(d3.zoom()
        .extent([[0, 0], [clientWidth, clientHeight]])
        .scaleExtent([0.1, 7])
        .on("zoom", zoomed));

    function zoomed() {
        everything.attr("transform", d3.event.transform);
    }

    return {
        svg: svg,
        everything: everything,
        simulation: simulation
    }

}
