import {colorToNumber, getColor, getLinkLabel, getNodeLabel} from "./utils";
import * as PIXI from 'pixi.js-legacy'

export default class EventStore {

    clickedNodeData = undefined;//
    lastSelectedNodeData = undefined;// used to get the last selected data for menu.
    hoveredNodeData = undefined;

    nodeMenuEl = undefined;

    constructor(nodeMenuEl) {
        this.nodeMenuEl = nodeMenuEl;
    }

    showMenu() {
        this.nodeMenuEl.style.display = "block";
    }

    hideMenu() {
        this.nodeMenuEl.style.display = "none";
    }

    onLinkClicked(graphCanvas, linkData, linkGfx, event) {
        console.log(linkData.id, " clicked");

    }

    onLinkMouseOver(graphCanvas, linkData, linkGfx, event) {
        console.log(linkData.id, "link MouseOver");

    }

    onLinkMouseOut(graphCanvas, linkData, linkGfx, event) {
        console.log(linkData.id, "link MouseOut");

    }

    createNodeMenu(graphCanvas, nodeData, event) {
        console.log("createNode Menu", nodeData, event);
        // https://www.programmersought.com/article/2722368758/
        // while (graphCanvas.nodeMenuLayer.children[0]) {
        //     graphCanvas.nodeMenuLayer.removeChild(graphCanvas.nodeMenuLayer.children[0]);
        // }
        //
        // const menuList = ["item1", "item2", "item3",];
        // // const scale = graphCanvas.nodeMenuLayer.state.scale;
        // const scale = 1;
        // menuList.forEach((menuItem, currentItemNo) => {
        //
        //     const menuItemContainer = new PIXI.Container();
        //
        //
        //     const bg = new PIXI.Graphics();
        //     bg.beginFill(0x131227, .8);
        //     bg.drawRect(0, 0, 100 * scale, 25* scale);
        //     bg.endFill();
        //     bg.y = currentItemNo * 25 *  scale;
        //     menuItemContainer.addChild(bg);
        //     const stylecoin = {
        //         fontSize: 12 * scale,
        //         fill: "0xeade1a",
        //         // fontFamily: ["Young Round", "Microsoft YaHei", "Black Body", "sans-serif",],
        //         // fontWeight: 'bold',
        //         letterSpacing: 2
        //     };
        //     const _txt = new PIXI.Text("Item " + currentItemNo, stylecoin);
        //     _txt.x = (100** scale - _txt.width) / 2;
        //     _txt.y = currentItemNo * 25 *  scale;
        //     //return context;
        //     menuItemContainer.addChild(_txt)
        //     menuItemContainer.interactive = true;
        //     menuItemContainer.buttonMode = true;
        //     // graphCanvas.nodeMenuLayer.visible = that.curr==0?true:that.show;
        //
        //     menuItemContainer.on('mousedown', event => {
        //         alert("Clicked " + currentItemNo)
        //     });
        //
        //
        //     graphCanvas.nodeMenuLayer.addChild(menuItemContainer);
        // })
        //
        // graphCanvas.nodeMenuLayer.x = nodeData.x;
        // graphCanvas.nodeMenuLayer.y = nodeData.y;
        this.nodeMenuEl.style.left = event.data.global.x + +graphCanvas.settings.NODE_MENU_X_PADDING + "px";
        this.nodeMenuEl.style.top = event.data.global.y + "px";
    }

    moveNodeMenu(graphCanvas, point, event) {
        console.log("moveNodeMenu Menu", point, event);
        console.log("move=====", event.data.global.x, event.data.global.y)
        graphCanvas.nodeMenuLayer.x = point.x;
        graphCanvas.nodeMenuLayer.y = point.y;
        this.nodeMenuEl.style.left = event.data.global.x + graphCanvas.settings.NODE_MENU_X_PADDING + "px";
        this.nodeMenuEl.style.top = event.data.global.y + "px";
    }

    moveNode = (nodeData, point, graphCanvas, event) => {
        nodeData.x = point.x;
        nodeData.y = point.y;
        graphCanvas.updatePositions();
        this.moveNodeMenu(graphCanvas, point, event);
    };

    appMouseMove(event, graphCanvas) {
        if (!this.clickedNodeData) {
            return;
        }

        this.moveNode(this.clickedNodeData, graphCanvas.viewport.toWorld(event.data.global), graphCanvas, event);
    };

    onNodeClicked(graphCanvas, nodeData, nodeContainer, event) {

        this.showMenu();
        this.clickedNodeData = nodeData;
        this.lastSelectedNodeData = nodeData;
        console.log(this.clickedNodeData.id, " clicked");
        let _this = this;

        graphCanvas.onNodeSelected(nodeData);

        // TODO -  this will make the node drag functionality
        // enable node dragging
        // graphCanvas.pixiApp.renderer.plugins.interaction.on('mousemove', (mouseEvent) => _this.appMouseMove(mouseEvent, graphCanvas));
        // disable viewport dragging
        // graphCanvas.viewport.pause = true;
        console.log("clicked", event);
        this.createNodeMenu(graphCanvas, nodeData, event)

    }

    focusGraph(graphCanvas) {

    }

    highlightNode(graphCanvas, nodes) {
        console.log("highlightNodes ", nodes);
        // add hover effect
        graphCanvas.graphStore.focusOnNodes(nodes);

        // const neighborsData = graphCanvas.dataStore.getNeighborNodesAndLinks([nodeData])
        // let nodes2Highlight = neighborsData.nodes;
        // nodes2Highlight.push(nodeData);
        // const links2Highlight = neighborsData.links;
        // console.log("====nodes2Highlight, links2Highlight", nodes2Highlight, links2Highlight)
        //
        // graphCanvas.graphStore.hoveredNodeGfxOriginalChildren = []
        // graphCanvas.graphStore.hoveredNodeLabelGfxOriginalChildren = []
        //
        // graphCanvas.graphStore.hoveredlinkGfxOriginalChildren = [];
        // graphCanvas.graphStore.hoveredlinkLabelOriginalChildren = [];
        //
        //
        // const {LINK_DEFAULT_LABEL_FONT_SIZE, LABEL_FONT_FAMILY, LINK_DEFAULT_WIDTH} = graphCanvas.settings;
        // const {notNeighborLinks, notNeighborNodes} = graphCanvas.dataStore.getNotNeighborLinks([nodeData]);
        // notNeighborLinks.forEach((linkData) => {
        //     let linkGfx = graphCanvas.graphStore.linkDataToLinkGfx.get(linkData);
        //     let linkGfxLabel = graphCanvas.graphStore.linkDataToLabelGfx.get(linkData);
        //     console.log("==linkLayer", linkData, linkGfx);
        //     const linkLabelGfx = graphCanvas.graphStore.linkDataToLabelGfx.get(linkData);
        //
        //     // delete linkGfx.children[0];
        //     linkGfx.alpha = graphCanvas.settings.LINK_UN_HIGHLIGHT_ALPHA;
        //     linkGfxLabel.alpha = graphCanvas.settings.LINK_UN_HIGHLIGHT_ALPHA;
        //     graphCanvas.graphStore.hoveredlinkGfxOriginalChildren.push([...linkGfx.children]);
        //     graphCanvas.graphStore.hoveredlinkLabelOriginalChildren.push([...linkLabelGfx.children]);
        //
        //     // // circle border
        //     // let linkGfxHilight = new PIXI.Graphics();
        //     // // linkGfx.id = "link-" + linkData.id;
        //     //
        //     //
        //     // linkGfxHilight.lineStyle(Math.sqrt(LINK_DEFAULT_WIDTH), 0xefefef);
        //     // linkGfxHilight.alpha = 0.1;
        //     // linkGfxHilight.moveTo(linkData.source.x, linkData.source.y);
        //     // linkGfxHilight.lineTo(linkData.target.x, linkData.target.y);
        //     //
        //     //
        //     // linkGfx.addChild(linkGfxHilight);
        //     // let linkGfxLabelHighlight = new PIXI.Graphics();
        //     // const linkLabelText = new PIXI.Text(getLinkLabel(linkData), {
        //     //     fontFamily: LABEL_FONT_FAMILY,
        //     //     fontSize: LINK_DEFAULT_LABEL_FONT_SIZE,
        //     //     fill: 0xefefef
        //     // });
        //     // linkLabelText.resolution = graphCanvas.settings.LABEL_RESOLUTION;
        //     // const sameIndex = 1;
        //     // linkLabelText.x = (linkData.source.x + linkData.target.x) / 2 - 10 * sameIndex;
        //     // linkLabelText.y = (linkData.source.y + linkData.target.y) / 2 - 10 * sameIndex;
        //     // linkLabelText.anchor.set(0.5, 0);
        //     // linkGfxLabelHighlight.addChild(linkLabelText)
        //     //
        //     // linkGfxLabel.addChild(linkGfxLabelHighlight)
        //
        //     // move to front layer
        //     graphCanvas.linksLayer.removeChild(linkGfx);
        //     graphCanvas.frontLayer.addChild(linkGfx);
        //     graphCanvas.linksLabelsLayer.removeChild(linkGfxLabel);
        //     graphCanvas.frontLayer.addChild(linkGfxLabel);
        //
        //
        // })
        //
        // notNeighborNodes.forEach((node2Highlight) => {
        //     let nodeContainer = graphCanvas.graphStore.nodeDataToNodeGfx.get(node2Highlight);
        //     console.log("==nodeContainer", node2Highlight, nodeContainer);
        //     const labelGfx = graphCanvas.graphStore.nodeDataToLabelGfx.get(node2Highlight);
        //     //
        //     // graphCanvas.graphStore.hoveredNodeGfxOriginalChildren.push([...nodeContainer.children]);
        //     // graphCanvas.graphStore.hoveredNodeLabelGfxOriginalChildren.push([...labelGfx.children]);
        //
        //     // // circle border
        //     // const circleBorder = new PIXI.Graphics();
        //     // circleBorder.x = 0;
        //     // circleBorder.y = 0;
        //     // circleBorder.lineStyle(1.5, 0x000000);
        //     // circleBorder.drawCircle(0, 0, graphCanvas.settings.NODE_RADIUS);
        //     // nodeContainer.addChild(circleBorder);
        //     // nodeContainer.alpha = 0.1
        //     nodeContainer.alpha = graphCanvas.settings.LINK_UN_HIGHLIGHT_ALPHA;
        //     labelGfx.alpha = graphCanvas.settings.LINK_UN_HIGHLIGHT_ALPHA;
        //
        //     // // move to front layer
        //     // graphCanvas.nodesLayer.removeChild(nodeContainer);
        //     // graphCanvas.frontLayer.addChild(nodeContainer);
        //     // graphCanvas.nodeLabelsLayer.removeChild(labelGfx);
        //     // graphCanvas.frontLayer.addChild(labelGfx);
        //
        // });

    }

    unHighlightNode(graphCanvas, nodeData) {

        graphCanvas.graphStore.resetFocus();

        // const neighborsData = graphCanvas.dataStore.getNeighborNodesAndLinks([nodeData])
        // let nodes2Highlight = neighborsData.nodes;
        // nodes2Highlight.push(nodeData);
        // const links2Highlight = neighborsData.links;
        // const {notNeighborLinks, notNeighborNodes} = graphCanvas.dataStore.getNotNeighborLinks([nodeData]);
        // console.log("notNeighborLinks", notNeighborLinks)
        // // reseting the rest of the links
        // notNeighborLinks.forEach((link2Highlight, i) => {
        //
        //     const linkGfx = graphCanvas.graphStore.linkDataToLinkGfx.get(link2Highlight);
        //     const linkLabelGfx = graphCanvas.graphStore.linkDataToLabelGfx.get(link2Highlight);
        //     console.log("====unhighlight link", link2Highlight, linkGfx)
        //
        //     linkGfx.alpha = graphCanvas.settings.LINK_DEFAULT_ALPHA;
        //     linkLabelGfx.alpha = graphCanvas.settings.LINK_DEFAULT_ALPHA;
        //     //
        //     // // move back from front layer
        //     graphCanvas.frontLayer.removeChild(linkGfx);
        //     graphCanvas.linksLayer.addChild(linkGfx);
        //     graphCanvas.frontLayer.removeChild(linkLabelGfx);
        //     graphCanvas.linksLabelsLayer.addChild(linkLabelGfx);
        //
        //     // // clear hover effect
        //     // const nodeGfxChildren = [...linkGfx.children];
        //     // for (let child of nodeGfxChildren) {
        //     //     if (graphCanvas.graphStore.hoveredlinkGfxOriginalChildren[i]
        //     //         && !graphCanvas.graphStore.hoveredlinkGfxOriginalChildren[i].includes(child)) {
        //     //         linkGfx.removeChild(child);
        //     //     }
        //     // }
        //     // const labelGfxChildren = [...linkLabelGfx.children];
        //     // for (let child of labelGfxChildren) {
        //     //     if (graphCanvas.graphStore.hoveredlinkLabelOriginalChildren[i]
        //     //         && !graphCanvas.graphStore.hoveredlinkLabelOriginalChildren[i].includes(child)) {
        //     //         linkLabelGfx.removeChild(child);
        //     //     }
        //     // }
        // })
        // notNeighborNodes.forEach((node2Highlight, i) => {
        //     const nodeGfx = graphCanvas.graphStore.nodeDataToNodeGfx.get(node2Highlight);
        //     const labelGfx = graphCanvas.graphStore.nodeDataToLabelGfx.get(node2Highlight);
        //
        //     // move back from front layer
        //     graphCanvas.frontLayer.removeChild(nodeGfx);
        //     graphCanvas.nodesLayer.addChild(nodeGfx);
        //     graphCanvas.frontLayer.removeChild(labelGfx);
        //     graphCanvas.nodeLabelsLayer.addChild(labelGfx);
        //
        //     nodeGfx.alpha = 1;
        //     labelGfx.alpha = 1;
        //
        //     // // clear hover effect
        //     // const nodeGfxChildren = [...nodeGfx.children];
        //     // for (let child of nodeGfxChildren) {
        //     //     if (graphCanvas.graphStore.hoveredNodeGfxOriginalChildren[i] && !graphCanvas.graphStore.hoveredNodeGfxOriginalChildren[i].includes(child)) {
        //     //         nodeGfx.removeChild(child);
        //     //     }
        //     // }
        //     // const labelGfxChildren = [...labelGfx.children];
        //     // for (let child of labelGfxChildren) {
        //     //     if (graphCanvas.graphStore.hoveredNodeLabelGfxOriginalChildren[i] && !graphCanvas.graphStore.hoveredNodeLabelGfxOriginalChildren[i].includes(child)) {
        //     //         labelGfx.removeChild(child);
        //     //     }
        //     // }
        // })
        //
        //
        // graphCanvas.graphStore.hoveredNodeGfxOriginalChildren = [];
        // graphCanvas.graphStore.hoveredNodeLabelGfxOriginalChildren = [];
        //
        // graphCanvas.graphStore.hoveredlinkGfxOriginalChildren = [];
        // graphCanvas.graphStore.hoveredlinkLabelOriginalChildren = [];

        graphCanvas.requestRender();
    }

    onNodeMouseOver(graphCanvas, nodeData, nodeContainer, event) {
        console.log(nodeData.id, " mouseover");


        // const neighborsData = graphCanvas.dataStore.getNeighborNodesAndLinks(nodeData)
        //
        // let ignoreNodesHoverWhenFocused = [];
        // ignoreNodesHoverWhenFocused.p
        // neighborsData.push(nodeData);
        // neighborsData.
        if (graphCanvas.dataStore.focusedNodes.length > 0) {
            // if (graphCanvas.dataStore.checkIfNodeExistInFocused(nodeData){
            // dont hover-highlight when there is focus selected.
            return
        }

        if (nodeData) {
            this.highlightNode(graphCanvas, [nodeData])
            // for drag feature
            if (this.clickedNodeData) {
                return;
            }
            this.hoveredNodeData = nodeData;
            graphCanvas.requestRender();
        }

    }

    onNodeMouseOut(graphCanvas, nodeData, nodeContainer, event) {
        console.log(nodeData.id, " mouseout");
        if (graphCanvas.dataStore.focusedNodes.length > 0) {
            // if (graphCanvas.dataStore.checkIfNodeExistInFocused(nodeData){
            // dont hover-highlight when there is focus selected.
            return
        }
        this.unHighlightNode(graphCanvas, nodeData)

        if (this.clickedNodeData) {
            return;
        }
    }

    unsetSelectedNodeData() {
        this.clickedNodeData = undefined;
    }


    onNodeUnClicked(graphCanvas, nodeData, nodeContainer, event) {
        console.log("===onNodeUnClicked", nodeData);
        this.unsetSelectedNodeData();

        // disable node dragging
        graphCanvas.pixiApp.renderer.plugins.interaction.off('mousemove', (event) => this.appMouseMove(event, graphCanvas));
        // enable viewport dragging
        graphCanvas.viewport.pause = false;
    }

}
