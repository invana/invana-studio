import React from "react";

export default class IndexView extends React.Component {


    render() {
        window.location.href = "/connect";
        return (
            <span>switching server...</span>
        )

    }
}
