import React from 'react';
import DefaultLayout from "../../layout/default";
import RoutableRemoteEngine from "../../layout/routable-remote";


export default class SettingsView extends RoutableRemoteEngine {
    constructor(props) {
        super(props);
        this.state = {...this.state};
        this.child = React.createRef();
    }

    render() {
        return (<DefaultLayout {...this.props} ref={this.child}>
            <div>Settings view</div>
        </DefaultLayout>)
    }

}
