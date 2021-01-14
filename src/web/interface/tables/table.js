import React from "react";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import PropTypes from "prop-types";

export default class TableInterface extends React.Component {

    static propTypes = {
        rendererData: PropTypes.any
    }

    render() {
        return (
            <Table striped bordered hover size={"sm"}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>

                </tbody>
            </Table>
        )
    }
}
