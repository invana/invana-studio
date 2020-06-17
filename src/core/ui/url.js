import React from "react";


export class SetQueryToUrl extends React.Component {

    static defaultProps = {
        query: null
    }

    setQueryToUrl(query) {
        console.log("===setQueryToUrl", query);
        let u = new URL(window.location.href);
        let searchParams = new URLSearchParams(window.location.search);
        if (query && query !== "null") {
            searchParams.set("query", query);
            window.history.pushState({}, null, u.origin + u.pathname + "?" + searchParams.toString());
        }
    }


    render() {
        this.setQueryToUrl(this.props.query);
        return (
            <div></div>
        )
    }
}
