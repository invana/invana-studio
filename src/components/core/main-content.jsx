import React from "react";


const mainContent = {
    position: 'fixed',
    right: '0',
    top: '0',
    width: 'calc(100% - 41px)',
    height: '100vh'
};

export default class MainContent extends React.Component {


    render() {

        return (
            <div id="main-content" style={mainContent}>
                {this.props.children}
            </div>
        )
    }
}

