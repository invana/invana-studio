import { Nav, Divider } from 'rsuite';
import * as BsIcon from "react-bootstrap-icons"
import { clearCanvasData } from '../../state/canvas/canvasSlice';
import { useDispatch } from 'react-redux';
import React from 'react';
import { Modal, Button } from 'rsuite';
import RemindIcon from '@rsuite/icons/legacy/Remind';


const ExplorerCanvasMenu = () => {

    const dipatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return <div>
        <Modal backdrop="static" role="alertdialog" open={open} onClose={handleClose} size="xs">
            <Modal.Header>
                <Modal.Title><RemindIcon style={{ color: '#ffb300', fontSize: 24 }} /> Clear canvas</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                This will clear all the data you see on the canavas.
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => dipatch(clearCanvasData()) && handleClose()} appearance="primary">
                    Confirm
                </Button>
                <Button onClick={handleClose} appearance="subtle" >
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
        <Nav justified appearance="default">
            <Nav.Item icon={<BsIcon.ArrowLeft />} onClick={() => console.log("clicked")}></Nav.Item>
            <Nav.Item icon={<BsIcon.ArrowClockwise />} onClick={() => console.log("clicked")}></Nav.Item>
            <Nav.Item icon={<BsIcon.ArrowRight />} onClick={() => console.log("clicked")}></Nav.Item>
            <Nav.Item as={'span'} ><Divider vertical /></Nav.Item>
            <Nav.Item icon={<BsIcon.Search />} onClick={() => console.log("clicked")}></Nav.Item>
            <Nav.Item icon={<BsIcon.Binoculars />} onClick={() => console.log("clicked")}></Nav.Item>
            <Nav.Item icon={<BsIcon.Camera />} onClick={() => console.log("clicked")}></Nav.Item>
            <Nav.Item icon={<BsIcon.Download />} onClick={() => console.log("clicked")}></Nav.Item>
            <Nav.Item icon={<BsIcon.Cursor />} onClick={() => console.log("clicked")}></Nav.Item>
            <Nav.Item icon={<BsIcon.Palette />} onClick={() => console.log("clicked")}></Nav.Item>
            <Nav.Item as={'span'} ><Divider vertical /></Nav.Item>
            <Nav.Item icon={<BsIcon.Trash />} onClick={() => handleOpen()}></Nav.Item>
            <Nav.Item as={'span'} ><Divider vertical /></Nav.Item>
            <Nav.Item icon={<BsIcon.Diagram3 />} onClick={() => console.log("clicked")}></Nav.Item>
            <Nav.Item icon={<BsIcon.BoundingBoxCircles />} onClick={() => console.log("clicked")}></Nav.Item>
        </Nav>
    </div>
}

export default ExplorerCanvasMenu