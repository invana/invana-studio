import "./footer.scss"
import {  useSelector } from "react-redux";
import { RootState } from "../../../state/store";


const CanvasFooter = () => {


    const hoveredElement: any = useSelector((state: RootState)=> state.canvas.hoveredElement);
    const canvasData: any = useSelector((state: RootState)=> state.canvas.canvasData);

    console.log("====hoveredElement", hoveredElement)
 
    return <div className="canvasFooter" style={{paddingRight: 15, paddingLeft: 15}}>
        {
            hoveredElement && <span>{hoveredElement.type}#{hoveredElement.id}[{hoveredElement.group}:{hoveredElement.label}] </span>
        }
        <span style={{ float: "right" }}>
            <span style={{ marginRight: 15 }}>{canvasData.nodes.length} nodes, {canvasData.edges.length} relationships in the canvas</span>
            <span style={{ marginRight: 15 }}>took 300ms to query</span>
        </span>
    </div>
}

export default CanvasFooter;