// import {colorToNumber, getColor, getLinkLabel, getNodeLabel} from "./old/utils";
// import * as PIXI from 'pixi.js-legacy'

export default class EventStore {

    clickedNodeData = undefined;//
    lastSelectedNodeData = undefined;// used to get the last selected data for menu-ui-components.
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

    onLinkClicked(graphicsEngine, linkData, linkGfx, event) {
        console.log(linkData.id, linkGfx, event, " clicked");

    }

    onLinkMouseOver(graphicsEngine, linkData, linkGfx, event) {
        console.log(linkData.id, linkGfx, event, "link MouseOver");

    }

    onLinkMouseOut(graphicsEngine, linkData, linkGfx, event) {
        console.log(linkData.id, linkGfx, event, "link MouseOut");

    }

    createNodeMenu(graphicsEngine, nodeData, event) {
        console.log("createNode Menu", nodeData, event);
        // https://www.programmersought.com/article/2722368758/
        // while (graphicsEngine.nodeMenuLayer.children[0]) {
        //     graphicsEngine.nodeMenuLayer.removeChild(graphicsEngine.nodeMenuLayer.children[0]);
        // }
        //
        // const menuList = ["item1", "item2", "item3",];
        // // const scale = graphicsEngine.nodeMenuLayer.state.scale;
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
        //     // graphicsEngine.nodeMenuLayer.visible = that.curr==0?true:that.show;
        //
        //     menuItemContainer.on('mousedown', event => {
        //         alert("Clicked " + currentItemNo)
        //     });
        //
        //
        //     graphicsEngine.nodeMenuLayer.addChild(menuItemContainer);
        // })
        //
        // graphicsEngine.nodeMenuLayer.x = nodeData.x;
        // graphicsEngine.nodeMenuLayer.y = nodeData.y;
        this.nodeMenuEl.style.left = event.data.global.x + graphicsEngine.settings.NODE_MENU_X_PADDING + "px";
        this.nodeMenuEl.style.top = event.data.global.y + graphicsEngine.settings.NODE_MENU_Y_PADDING + "px";
    }

    moveNodeMenu(graphicsEngine, point, event) {
        console.log("moveNodeMenu Menu", point, event);
        console.log("move=====", event.data.global.x, event.data.global.y)
        graphicsEngine.nodeMenuLayer.x = point.x;
        graphicsEngine.nodeMenuLayer.y = point.y;
        this.nodeMenuEl.style.left = event.data.global.x + graphicsEngine.settings.NODE_MENU_X_PADDING + "px";
        this.nodeMenuEl.style.top = event.data.global.y + graphicsEngine.settings.NODE_MENU_Y_PADDING + "px";
    }

    moveNode = (nodeData, point, graphicsEngine, event) => {
        nodeData.x = point.x;
        nodeData.y = point.y;
        graphicsEngine.updatePositions();
        this.moveNodeMenu(graphicsEngine, point, event);
    };

    appMouseMove(event, graphicsEngine) {
        if (!this.clickedNodeData) {
            return;
        }

        this.moveNode(this.clickedNodeData, graphicsEngine.viewport.toWorld(event.data.global), graphicsEngine, event);
    }

    onNodeClicked(graphicsEngine, nodeData, nodeContainer, event) {

        this.showMenu();
        this.clickedNodeData = nodeData;
        this.lastSelectedNodeData = nodeData;
        console.log(this.clickedNodeData.id, " clicked");
        graphicsEngine.onNodeSelected(nodeData);

        // TODO -  this will make the node drag functionality
        // enable node dragging
        // graphicsEngine.pixiApp.renderer.plugins.interaction.on('mousemove', (mouseEvent) => _this.appMouseMove(mouseEvent, graphicsEngine));
        // disable viewport dragging
        // graphicsEngine.viewport.pause = true;
        console.log("clicked", event);
        this.createNodeMenu(graphicsEngine, nodeData, event);

    }

    focusGraph(graphicsEngine) {
        console.log("====graphicsEngine", graphicsEngine)
    }

    highlightNodes(graphicsEngine, nodes) {
        console.log("highlightNodes ", nodes);
        // add hover effect
        graphicsEngine.graphicsStore.focusOnNodes(nodes);

        // const neighborsData = graphicsEngine.dataStore.getNeighborNodesAndLinks([nodeData])
        // let nodes2Highlight = neighborsData.nodes;
        // nodes2Highlight.push(nodeData);
        // const links2Highlight = neighborsData.links;
        // console.log("====nodes2Highlight, links2Highlight", nodes2Highlight, links2Highlight)
        //
        // graphicsEngine.graphicsStore.hoveredNodeGfxOriginalChildren = []
        // graphicsEngine.graphicsStore.hoveredNodeLabelGfxOriginalChildren = []
        //
        // graphicsEngine.graphicsStore.hoveredlinkGfxOriginalChildren = [];
        // graphicsEngine.graphicsStore.hoveredlinkLabelOriginalChildren = [];
        //
        //
        // const {LINK_DEFAULT_LABEL_FONT_SIZE, LABEL_FONT_FAMILY, LINK_DEFAULT_WIDTH} = graphicsEngine.settings;
        // const {notNeighborLinks, notNeighborNodes} = graphicsEngine.dataStore.getNotNeighborLinks([nodeData]);
        // notNeighborLinks.forEach((linkData) => {
        //     let linkGfx = graphicsEngine.graphicsStore.linkDataToLinkGfx.get(linkData);
        //     let linkGfxLabel = graphicsEngine.graphicsStore.linkDataToLabelGfx.get(linkData);
        //     console.log("==linkLayer", linkData, linkGfx);
        //     const linkLabelGfx = graphicsEngine.graphicsStore.linkDataToLabelGfx.get(linkData);
        //
        //     // delete linkGfx.children[0];
        //     linkGfx.alpha = graphicsEngine.settings.LINK_UN_HIGHLIGHT_ALPHA;
        //     linkGfxLabel.alpha = graphicsEngine.settings.LINK_UN_HIGHLIGHT_ALPHA;
        //     graphicsEngine.graphicsStore.hoveredlinkGfxOriginalChildren.push([...linkGfx.children]);
        //     graphicsEngine.graphicsStore.hoveredlinkLabelOriginalChildren.push([...linkLabelGfx.children]);
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
        //     // linkLabelText.resolution = graphicsEngine.settings.LABEL_RESOLUTION;
        //     // const sameIndex = 1;
        //     // linkLabelText.x = (linkData.source.x + linkData.target.x) / 2 - 10 * sameIndex;
        //     // linkLabelText.y = (linkData.source.y + linkData.target.y) / 2 - 10 * sameIndex;
        //     // linkLabelText.anchor.set(0.5, 0);
        //     // linkGfxLabelHighlight.addChild(linkLabelText)
        //     //
        //     // linkGfxLabel.addChild(linkGfxLabelHighlight)
        //
        //     // move to front layer
        //     graphicsEngine.linksLayer.removeChild(linkGfx);
        //     graphicsEngine.frontLayer.addChild(linkGfx);
        //     graphicsEngine.linksLabelsLayer.removeChild(linkGfxLabel);
        //     graphicsEngine.frontLayer.addChild(linkGfxLabel);
        //
        //
        // })
        //
        // notNeighborNodes.forEach((node2Highlight) => {
        //     let nodeContainer = graphicsEngine.graphicsStore.nodeDataToNodeGfx.get(node2Highlight);
        //     console.log("==nodeContainer", node2Highlight, nodeContainer);
        //     const labelGfx = graphicsEngine.graphicsStore.nodeDataToLabelGfx.get(node2Highlight);
        //     //
        //     // graphicsEngine.graphicsStore.hoveredNodeGfxOriginalChildren.push([...nodeContainer.children]);
        //     // graphicsEngine.graphicsStore.hoveredNodeLabelGfxOriginalChildren.push([...labelGfx.children]);
        //
        //     // // circle border
        //     // const circleBorder = new PIXI.Graphics();
        //     // circleBorder.x = 0;
        //     // circleBorder.y = 0;
        //     // circleBorder.lineStyle(1.5, 0x000000);
        //     // circleBorder.drawCircle(0, 0, graphicsEngine.settings.NODE_RADIUS);
        //     // nodeContainer.addChild(circleBorder);
        //     // nodeContainer.alpha = 0.1
        //     nodeContainer.alpha = graphicsEngine.settings.LINK_UN_HIGHLIGHT_ALPHA;
        //     labelGfx.alpha = graphicsEngine.settings.LINK_UN_HIGHLIGHT_ALPHA;
        //
        //     // // move to front layer
        //     // graphicsEngine.nodesLayer.removeChild(nodeContainer);
        //     // graphicsEngine.frontLayer.addChild(nodeContainer);
        //     // graphicsEngine.nodeLabelsLayer.removeChild(labelGfx);
        //     // graphicsEngine.frontLayer.addChild(labelGfx);
        //
        // });

    }

    unHighlightNode(graphicsEngine, nodeData) {
        console.log("=====unHighlightNode", nodeData)
        graphicsEngine.graphicsStore.resetFocus();

        // const neighborsData = graphicsEngine.dataStore.getNeighborNodesAndLinks([nodeData])
        // let nodes2Highlight = neighborsData.nodes;
        // nodes2Highlight.push(nodeData);
        // const links2Highlight = neighborsData.links;
        // const {notNeighborLinks, notNeighborNodes} = graphicsEngine.dataStore.getNotNeighborLinks([nodeData]);
        // console.log("notNeighborLinks", notNeighborLinks)
        // // reseting the rest of the links
        // notNeighborLinks.forEach((link2Highlight, i) => {
        //
        //     const linkGfx = graphicsEngine.graphicsStore.linkDataToLinkGfx.get(link2Highlight);
        //     const linkLabelGfx = graphicsEngine.graphicsStore.linkDataToLabelGfx.get(link2Highlight);
        //     console.log("====unhighlight link", link2Highlight, linkGfx)
        //
        //     linkGfx.alpha = graphicsEngine.settings.LINK_DEFAULT_ALPHA;
        //     linkLabelGfx.alpha = graphicsEngine.settings.LINK_DEFAULT_ALPHA;
        //     //
        //     // // move back from front layer
        //     graphicsEngine.frontLayer.removeChild(linkGfx);
        //     graphicsEngine.linksLayer.addChild(linkGfx);
        //     graphicsEngine.frontLayer.removeChild(linkLabelGfx);
        //     graphicsEngine.linksLabelsLayer.addChild(linkLabelGfx);
        //
        //     // // clear hover effect
        //     // const nodeGfxChildren = [...linkGfx.children];
        //     // for (let child of nodeGfxChildren) {
        //     //     if (graphicsEngine.graphicsStore.hoveredlinkGfxOriginalChildren[i]
        //     //         && !graphicsEngine.graphicsStore.hoveredlinkGfxOriginalChildren[i].includes(child)) {
        //     //         linkGfx.removeChild(child);
        //     //     }
        //     // }
        //     // const labelGfxChildren = [...linkLabelGfx.children];
        //     // for (let child of labelGfxChildren) {
        //     //     if (graphicsEngine.graphicsStore.hoveredlinkLabelOriginalChildren[i]
        //     //         && !graphicsEngine.graphicsStore.hoveredlinkLabelOriginalChildren[i].includes(child)) {
        //     //         linkLabelGfx.removeChild(child);
        //     //     }
        //     // }
        // })
        // notNeighborNodes.forEach((node2Highlight, i) => {
        //     const nodeGfx = graphicsEngine.graphicsStore.nodeDataToNodeGfx.get(node2Highlight);
        //     const labelGfx = graphicsEngine.graphicsStore.nodeDataToLabelGfx.get(node2Highlight);
        //
        //     // move back from front layer
        //     graphicsEngine.frontLayer.removeChild(nodeGfx);
        //     graphicsEngine.nodesLayer.addChild(nodeGfx);
        //     graphicsEngine.frontLayer.removeChild(labelGfx);
        //     graphicsEngine.nodeLabelsLayer.addChild(labelGfx);
        //
        //     nodeGfx.alpha = 1;
        //     labelGfx.alpha = 1;
        //
        //     // // clear hover effect
        //     // const nodeGfxChildren = [...nodeGfx.children];
        //     // for (let child of nodeGfxChildren) {
        //     //     if (graphicsEngine.graphicsStore.hoveredNodeGfxOriginalChildren[i] && !graphicsEngine.graphicsStore.hoveredNodeGfxOriginalChildren[i].includes(child)) {
        //     //         nodeGfx.removeChild(child);
        //     //     }
        //     // }
        //     // const labelGfxChildren = [...labelGfx.children];
        //     // for (let child of labelGfxChildren) {
        //     //     if (graphicsEngine.graphicsStore.hoveredNodeLabelGfxOriginalChildren[i] && !graphicsEngine.graphicsStore.hoveredNodeLabelGfxOriginalChildren[i].includes(child)) {
        //     //         labelGfx.removeChild(child);
        //     //     }
        //     // }
        // })
        //
        //
        // graphicsEngine.graphicsStore.hoveredNodeGfxOriginalChildren = [];
        // graphicsEngine.graphicsStore.hoveredNodeLabelGfxOriginalChildren = [];
        //
        // graphicsEngine.graphicsStore.hoveredlinkGfxOriginalChildren = [];
        // graphicsEngine.graphicsStore.hoveredlinkLabelOriginalChildren = [];

        graphicsEngine.requestRender();
    }

    onNodeMouseOver(graphicsEngine, nodeData, nodeContainer, event) {
        console.log(nodeData.id, nodeContainer, event, " mouseover");


        // const neighborsData = graphicsEngine.dataStore.getNeighborNodesAndLinks(nodeData)
        //
        // let ignoreNodesHoverWhenFocused = [];
        // ignoreNodesHoverWhenFocused.p
        // neighborsData.push(nodeData);
        // neighborsData.
        if (graphicsEngine.dataStore.getUniqueFocusedNodes().length > 0) {
            // if (graphicsEngine.dataStore.checkIfNodeExistInFocused(nodeData){
            // dont hover-highlight when there is focus selected.
            return
        }

        if (nodeData) {
            this.highlightNodes(graphicsEngine, [nodeData])
            // for drag feature
            if (this.clickedNodeData) {
                return;
            }
            this.hoveredNodeData = nodeData;
            graphicsEngine.requestRender();
        }

    }

    onNodeMouseOut(graphicsEngine, nodeData, nodeContainer, event) {
        console.log(nodeData.id, nodeContainer, event, " mouseout");
        if (graphicsEngine.dataStore.getUniqueFocusedNodes().length > 0) {
            // if (graphicsEngine.dataStore.checkIfNodeExistInFocused(nodeData){
            // dont hover-highlight when there is focus selected.
            return
        }
        this.unHighlightNode(graphicsEngine, nodeData)

        if (this.clickedNodeData) {
            return;
        }
    }

    unsetSelectedNodeData() {
        this.clickedNodeData = undefined;
    }


    onNodeUnClicked(graphicsEngine, nodeData, nodeContainer, event) {
        console.log("===onNodeUnClicked", nodeContainer, event, nodeData);
        this.unsetSelectedNodeData();

        // disable node dragging
        graphicsEngine.pixiApp.renderer.plugins.interaction.off('mousemove', (event) => this.appMouseMove(event, graphicsEngine));
        // enable viewport dragging
        graphicsEngine.viewport.pause = false;
    }

}
