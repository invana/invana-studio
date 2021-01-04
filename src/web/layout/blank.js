import React, {ReactPropTypes as PropTypes} from "react";
import Container from "react-bootstrap/Container";

export default class BlankLayout extends React.Component {

    static propTypes = {
        children: PropTypes.func,
    };

    render() {
        return (
            <Container fluid>{this.props.children}</Container>
        )
    }
}
