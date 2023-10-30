import React from "react";
import TabNav from '@rsuite/responsive-nav';
import MoreIcon from '@rsuite/icons/More';
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Content } from 'rsuite';


type CanvasItem = {
    id: string
    name: string

}


function generateRandomId() {
    return (Math.random() * 1e18).toString(36).slice(0, 5).toUpperCase() + '';
}


const CanvasTabs = () => {

    const defaultCanvasItem: CanvasItem = {
        id: "abc",
        name: "default-canvas",
    }

    const [activeCanvas, setActiveCanvas] = React.useState<string>("default-canvas");
    const [canvasList, setCanvasList] = React.useState([defaultCanvasItem,])



    const removeCanvas = (canvasId: string) => {
        const canvasListTemp = canvasList
        console.log("removeCanvas", canvasId, canvasListTemp, canvasList)

        canvasListTemp.splice(canvasListTemp.map(item => item.id).indexOf(canvasId), 1);
        const activeCanvasTempId = canvasListTemp[0] ? canvasListTemp[0].id : defaultCanvasItem.id;
        if (activeCanvasTempId) {
            setCanvasList(canvasListTemp)
            setActiveCanvas(activeCanvasTempId)
        } else {
            setCanvasList([defaultCanvasItem,])
            setActiveCanvas(defaultCanvasItem.id)

        }
    }
    return <React.Fragment>
        <TabNav
            removable
            appearance="tabs"
            moreText={<MoreIcon />}
            moreProps={{ noCaret: true }}
            activeKey={activeCanvas}
            onSelect={eventKey => {
                {/*
          // @ts-ignore */}
                setActiveCanvas(eventKey);
            }}
            onItemRemove={eventKey => removeCanvas(eventKey.toString())}
        >
            {canvasList.map(canvasItem => (
                <TabNav.Item key={canvasItem.id} eventKey={canvasItem.id}>{canvasItem.name}</TabNav.Item>

            ))}


        </TabNav>

        <Button
            onClick={() => {
                const canvasListTemp = canvasList;
                const itemKey = generateRandomId();
                canvasListTemp.push({
                    id: itemKey,
                    name: `canvas ${canvasListTemp.length + 1}`
                });
                setCanvasList(canvasListTemp)
                setActiveCanvas(itemKey)

            }}
        ><FontAwesomeIcon icon={faAdd} />
        </Button>
    </React.Fragment>
}

export default CanvasTabs