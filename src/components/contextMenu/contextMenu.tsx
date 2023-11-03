import { faDotCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch, useSelector } from "react-redux";
import { List } from 'rsuite';
import {  ContextMenuData, addToFocuedNodes } from "../../state/canvas/canvasSlice";
import { RootState } from "../../state/store";
import React from "react";
import "./contextMenu.scss";
import { Panel } from 'rsuite';
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";




const ContextMenu = () => {

    const dispatch = useDispatch()


    const menuOptions = [
        {
            icon: <FontAwesomeIcon icon={faDotCircle} />,
            title: 'Focus',
            onClick: () => dispatch(addToFocuedNodes(node))
        },
        {
            icon: <FontAwesomeIcon icon={faArrowLeft} />,
            title: 'InV',
            onClick: () => dispatch(addToFocuedNodes(node))
        },
        {
            icon: <FontAwesomeIcon icon={faArrowRight} />,
            title: 'outV',
            onClick: () => dispatch(addToFocuedNodes(node))
        }
    ]

    // const hoveredElement: any = useSelector((state: RootState) => state.canvas.hoveredElement);
    const contexMenuData: ContextMenuData | null = useSelector((state: RootState) => state.canvas.contextMenuData);
    if (!contexMenuData) return <React.Fragment />;
    const { node } = contexMenuData;
    return (
        <Panel className="is-panel nodeMenuContainer"
            header={
                <div><div className="">{node.group}#{node.id}</div>
                <h4>{node.label}</h4></div>
            }
            // @ts-ignore
            style={{ "left": contexMenuData.position_x + 5, "top": contexMenuData.position_y + 5 }}>

            
            <div className="body">
                <List>
                    {
                        menuOptions.map((option)=>{
                            return <List.Item style={{paddingLeft: 10, paddingRight:10}} onClick={option.onClick}>{option.icon} <span>{option.title}</span></List.Item>
                        })
                    }
      
                </List>
            </div>
            {/* {hoveredElement
                ? <h5 className={"mb-0 pt-2 font-weight-bold"}
                    style={{ "color": this.getElementColor() }}>{this.getVerboseIdentifier()}</h5>
                : <React.Fragment />
            }
            <p className={"mb-0 pb-0"} style={{ "color": this.getElementColor() }}>Label: {hoveredElement._label}</p>
            <p className={"mb-1 border-bottom "}>{hoveredElement.type.replace("g:", "")} id: {this.getIdentifier()}</p>

            <ul className={"nodeMenu border bg-secondary text-white"}> */}
            {/* {hoveredElement && hoveredElement.type === "g:Vertex"
                    ? <li className={"border-right"} onClick={() => this.onClickFocus()}>
                        <FontAwesomeIcon icon={faDotCircle} /> <span>Focus</span>
                    </li>
                    : <span></span>
                }
                {hoveredElement && hoveredElement.type === "g:Vertex"
                    ? <li className={"border-right"} onClick={() => this.onClickShowInV()}>
                        <FontAwesomeIcon icon={faArrowAltCircleLeft} /> <span>InV</span>
                    </li> : <span></span>
                } */}
            {/* {hoveredElement && hoveredElement.type === "g:Vertex"
                    ? <li className={"border-right"} onClick={() => this.onClickShowOutV()}>
                        <FontAwesomeIcon icon={faArrowAltCircleRight} /> <span>OutV</span>
                    </li> : <span></span>
                } */}
            {/* <li className={"border-right"} onClick={() => this.startNewQuery()}>
                    <FontAwesomeIcon icon={faTerminal} /> <span>Query</span>
                </li> */}
            {/*<li onClick={() => this.hideMenu()}>*/}
            {/*    <FontAwesomeIcon icon={faMinusCircle}/>*/}
            {/*</li>*/}
            {/* <li onClick={() => this.openElementSettings()}>
                    <FontAwesomeIcon icon={faCog} />
                </li> */}
            {/* </ul> */}

        </Panel>

    )

}

export default ContextMenu