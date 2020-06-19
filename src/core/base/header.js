import MainTopNav from "../ui/structure/top";
import React from "react";
import {VERSION} from "../../config";
import QueryInputForm from "../ui/form/query-forms";

export default class Header extends React.Component {

    static defaultProps = {
        canvasQuery: null,
        onQuerySubmit: () => console.error("Submit Query prop is missing for <Header />")
    }



    render() {
        return (
            <MainTopNav>
                <div className="left-side">
                    <a href="/" className={"logo"}><h1>Graph Explorer <small>{VERSION}</small></h1></a>
                </div>
                <div className="right-side">
                    <ul>
                        <li>
                            <QueryInputForm canvasQuery={this.props.canvasQuery}
                                            onQuerySubmit={this.props.onQuerySubmit}/>
                        </li>
                    </ul>
                </div>
            </MainTopNav>
        );
    }
}
