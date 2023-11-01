import React, { CSSProperties } from "react";
import "./focusedNode.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { Button } from "rsuite";

export const FocusedNode = ({ node, onRemove }: { node: any, onRemove: any }) => {
    return <div className="focusedNode">
        {node.id} <Button size={"xs"} onClick={()=>onRemove(node)}><FontAwesomeIcon icon={faClose} /></Button>
    </div>
}


const FocusedNodesList = ({ style, focusedNodes, onRemove }: { style: CSSProperties,  focusedNodes: any, onRemove: any }) => {
    return <div className="focusedNodesList" style={style}>
        {
            focusedNodes.map((focusedNode: any) => {
                console.log("=====focusedNodes", focusedNode)
                return <FocusedNode key={focusedNode.id} node={focusedNode} onRemove={onRemove} />
            })
        }
    </div>
}

export default FocusedNodesList;
 