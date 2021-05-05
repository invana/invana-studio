import React from "react";
import CanvasConsole from "./canvas-console";


export default class Canvas extends React.Component {


    render() {
        return (
            <div className="d-flex  flex-column" style={{"height": "100%"}}>
                <div className="" style={{"height": "calc(100% - 24px)"}}>
                    {
                        this.props.showCommandConsole
                            ? <CanvasConsole/>
                            : <React.Fragment/>
                    }
                </div>
                <div style={{"height": "24px"}} className={"pl-2 pr-2 border-top"}>Footer comes here</div>
                {/*<div className="p-2 bd-highlight">Flex item</div>*/}
            </div>
        );
    }
}
