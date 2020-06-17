import React from "react";


export class SetQueryToUrl extends React.Component {

    static defaultProps = {
        query: null
    }

    // componentDidMount() {
    //     if (this.props.query) {
    //         alert("adding to " + this.props.query);
    //     }
    // }
    //
    //
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (this.props.query) {
    //         alert("adding to " + this.props.query);
    //     }
    // }

    render() {
        // if (this.props.query) {
        //     alert("adding to " + this.props.query);
        // }
        console.log("this.props.query, this.props.query", this.props.query)
        let u = new URL(window.location.href);
        let searchParams = new URLSearchParams(window.location.search);
        searchParams.set("query", this.props.query);
        window.history.pushState({}, null, u.origin + u.pathname + "?" + searchParams.toString());

        return (
            <div></div>
        )
    }
}
