import React from "react";
import Modal from "../ui-components/modal/modal";
import {setDataToLocalStorage} from "../core/utils";
import {AUTH_CONSTANTS, VERSION, ABOUT_TEXT, DEMO_URL} from "../config";
import "./connect.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlayCircle, faAngleDown, faTimesCircle} from "@fortawesome/free-solid-svg-icons";


export default class SetupGremlinServerConnection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: null,
            showExtraHeaderOptions: false,
            extraHeadersCount: 1
        }
    }

    checkIfSecureProtocol(url) {
        const protocol = new URL(url).protocol;
        return protocol === "https:" || protocol === "wss:";
    }


    getHeaders() {

        let headers = {};
        document.querySelectorAll(".headerItem").forEach( (elem) => {
            const key = elem.querySelector(".headerKey").value;
            const val = elem.querySelector(".headerValue").value;
            console.log("======", key, val);
            headers[key] = val;
        })
        return headers;
    }

    onFormSubmit(e) {

        const gremlinServerUrl = e.target.gremlinServerUrl.value;
        // const isHttps = new URL(window.location.href).protocol === "https:" || new URL(window.location.href).protocol === "wss:";
        e.preventDefault();

        if (!gremlinServerUrl) {
            alert("Invalid Gremlin connection string");
        } else if (this.checkIfSecureProtocol(window.location.href) && !this.checkIfSecureProtocol(gremlinServerUrl)) {
            alert("Your connection string is not secure. You can only use https or wss connection string " +
                "when you are using Graph Explorer via https connection.")
        } else if (gremlinServerUrl) {
            const headers = this.getHeaders();
            setDataToLocalStorage(AUTH_CONSTANTS.gremlinServerUrlKey, gremlinServerUrl);
            setDataToLocalStorage(AUTH_CONSTANTS.httpHeadersKey, headers);
            window.location.href = "/";
        }

    }

    openDemo() {
        window.open(DEMO_URL);
    }

    toggleMoreOptions() {

        const errorMessage = "To provide custom headers, " +
            "you need to provide connection string" +
            " with http(s) protocol.";
        const gremlinServerUrl = document.querySelector('[name="gremlinServerUrl"]').value;
        if (!gremlinServerUrl) {
            alert(errorMessage);
            return
        }
        const isHttp = new URL(gremlinServerUrl).protocol.includes("http");
        if (isHttp) {
            this.setState({showExtraHeaderOptions: !this.state.showExtraHeaderOptions})
        } else {
            alert(errorMessage);
        }

    }

    addNewHeader() {
        this.setState({extraHeadersCount: this.state.extraHeadersCount + 1})
    }

    removeHeader() {
        this.setState({extraHeadersCount: this.state.extraHeadersCount - 1})

    }


    render() {
        const headersArrayTemp = Array.from({length: this.state.extraHeadersCount}, (_, index) => index + 1);

        return (
            <Modal title={null} size={"md"}>
                <div className={"connect"}>
                    <div className={"top-section"}>
                        <h1>Graph Explorer <small>{VERSION}</small></h1>
                        <p>{ABOUT_TEXT}</p>
                    </div>
                    {/*<hr/>*/}
                    <div className={"bottom-section"}>
                        <form action="" onSubmit={this.onFormSubmit.bind(this)}>
                            <input type="text" name={"gremlinServerUrl"}
                                // defaultValue={"ws://localhost:8182/gremlin"}
                                   placeholder={"http://user:password@localhost:8182/gremlin"}/>
                            <br/>

                            <p style={{"textAlign": "right", "marginBottom": 0}}>
                                <a onClick={this.toggleMoreOptions.bind(this)}>
                                    <FontAwesomeIcon icon={faAngleDown}/> http headers
                                </a>
                            </p>
                            {
                                this.state.showExtraHeaderOptions
                                    ?
                                    <div className={"headersList"}>

                                        <h4>Extra HTTP Headers</h4>
                                        {
                                            headersArrayTemp.map((headerItem) => {
                                                return <div key={headerItem}
                                                            className={"headerItem headerItem-" + headerItem}>
                                                    <input type="text"
                                                           className={"headerKey"}
                                                           placeholder={"header key"}
                                                           name={"headerKey"}
                                                    />
                                                    <input type="text"
                                                           className={"headerValue"}
                                                           placeholder={"header value"}
                                                           name={"headerValue"}
                                                    />
                                                    <a onClick={this.removeHeader.bind(this)}>
                                                        <FontAwesomeIcon icon={faTimesCircle}/>
                                                    </a>

                                                </div>

                                            })
                                        }

                                        <p><a onClick={this.addNewHeader.bind(this)}> + add new header</a></p>
                                    </div>
                                    : <span></span>

                            }

                            <button type={"submit"} className={"primary-btn button"}>Connect</button>

                            <button onClick={() => this.openDemo()} type={"button"}
                                    className={" button secondary-btn ml-10"}>
                                <FontAwesomeIcon icon={faPlayCircle}/> watch demo
                            </button>
                        </form>
                        {this.state.errorMessage ?
                            (
                                <p>
                                    <small className={"errorMessage"}>{this.state.errorMessage}</small>
                                </p>
                            ) : (<span></span>)
                        }
                        <p className={"built-with"}><small>Built with love for Humans
                            & Innovations at <a
                                className={"selected"}
                                target={"_blank"}
                                rel="noopener noreferrer"
                                href="https://invana.io">Invana</a></small>
                        </p>
                    </div>
                </div>
            </Modal>
        )
    }
}
