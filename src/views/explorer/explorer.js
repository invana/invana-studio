import React from "react";
import DefaultLayout from "../../ui-components/layout/default-layout";
import Canvas from "./canvas";


export default class Explorer extends React.Component {


    render() {
        return (
            <DefaultLayout>
                <Canvas />
            </DefaultLayout>
        );
    }
}
