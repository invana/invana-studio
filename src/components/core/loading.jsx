import React from "react";

export default class LoadingDiv extends React.Component {


    render() {

        return (
            <div>
                {(this.props.statusMessage && this.props.statusMessage.toLowerCase().includes("sending"))
                    ? (<div className='loadingDiv'><p>loading...</p></div>) : (<span></span>)
                }
            </div>

        )
    }
}
