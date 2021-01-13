import React from 'react';
import DefaultLayout from "../../layout/default";


export default class SettingsView extends React.Component {

    render() {
        return (<DefaultLayout {...this.props}>
            <div>Settings view</div>
        </DefaultLayout>)
    }

}
