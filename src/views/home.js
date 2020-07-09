import React from "react";
import LoadSpinner from "../ui-components/spinner/spinner";


export default class HomeView extends React.Component {


    componentDidMount() {
        window.location.href = "/explorer";
    }

    render() {
        return(
            <LoadSpinner />
        )
    }

}
