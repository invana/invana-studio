import "./footer.scss"
import {  useSelector } from "react-redux";
import { RootState } from "../../../state/store";


const CanvasFooter = () => {


    const hoveredElement: any = useSelector((state: RootState)=> state.canvas.hoveredElement);
    
    console.log("====hoveredElement", hoveredElement)
    const canvasDataStats = { nodesCount: 120, edgesCount: 2030 }

    return <div className="canvasFooter" style={{paddingRight: 15}}>
        {
            hoveredElement && <span>{hoveredElement.type}#{hoveredElement.id}[{hoveredElement.group}:{hoveredElement.label}] </span>
        }
        
        <span style={{ float: "right" }}>
            <span style={{ marginRight: 15 }}>{canvasDataStats.nodesCount} nodes, {canvasDataStats.edgesCount} relationships in the canvas</span>
            <span style={{ marginRight: 15 }}>took 300ms to query</span>
        </span>
    </div>
}

export default CanvasFooter;