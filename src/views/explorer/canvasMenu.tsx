import { Content, Nav, Navbar, Row, Col, Divider } from 'rsuite';
import * as BsIcon from "react-bootstrap-icons"


const ExplorerCanvasMenu = () => {
    return <Nav justified appearance="default">
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
        <Nav.Item icon={<BsIcon.Trash />} onClick={() => console.log("clicked")}></Nav.Item>
        <Nav.Item as={'span'} ><Divider vertical /></Nav.Item>
        <Nav.Item icon={<BsIcon.Diagram3 />} onClick={() => console.log("clicked")}></Nav.Item>
        <Nav.Item icon={<BsIcon.BoundingBoxCircles />} onClick={() => console.log("clicked")}></Nav.Item>
    </Nav>
}

export default ExplorerCanvasMenu