import React from "react";
import DefaultLayout from "../../ui-components/layout/default-layout";
import Canvas from "../../viewlets/canvas/canvas";
import Welcome from "../../viewlets/welcome/welcome";


export default class Explorer extends React.Component {


    render() {
        return (
            <DefaultLayout>
                <Welcome/>
                <Canvas />
            </DefaultLayout>
        );
    }
}
