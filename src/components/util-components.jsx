import React, {Component} from 'react';
import * as d3 from "d3";
import {GREMLIN_SERVER_URL, uuidv4} from "../config";

export default function CanvasStatsCanvas(props) {
    return <div id={"canvas-stats"}>{props.nodes_count} nodes; {props.links_count} edges;</div>;
}

export function PropertiesCanvas(props) {
    return <pre id="properties-div"></pre>;
}

export function NotificationDiv(props) {
    return <div id="notifications-div"></div>;
}

export function ConnectionStatus(props) {
    return <div id="connection-status"><span>{props.statusMessage}</span></div>;
}


export function CopyRightInfo(props) {
    return <div id="copy-right-info-div">Invana Graph UI</div>;
}


