import React from "react";
import InvanaEngineQueryManager from "../../queryBuilder";
import InvanaEngineHTTPConnector from "../../connector/invana-engine";
import {STUDIO_SETTINGS} from "../../settings";
import {getDataFromLocalStorage, setDataToLocalStorage} from "../../utils/localStorage";
import PropTypes from "prop-types";
import {HISTORY_SETTINGS} from "../../settings/history";


export default class DefaultRemoteComponent extends React.Component {


    static defaultProps = {
        connectionUrl: STUDIO_SETTINGS.CONNECTION_URL,
    }

    static propTypes = {
        connectionUrl: PropTypes.string,
        graphEngineName: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            canvasQueryString: null,
            queryObject: null,

            isConnected2Gremlin: null,
            isStreaming: null,
            isQuerying: null,
            statusCode: null,
            statusMessage: null,

            showQueryConsole: false,


        };
    }

    checkIfConnectionUrlIsValid() {
        return !!this.props.connectionUrl;
    }

    eventTranslator(eventName, eventValue) {
        // console.log("===eventName", eventName, eventValue);
        if (eventName === "statusMessage") {
            this.setStatusMessage(eventValue);
        } else if (eventName === "statusCode") {
            this.setstatusCode(eventValue);
        } else if (eventName === "isStreaming") {
            this.setIsStreaming(eventValue);
        } else if (eventName === "errorMessage") {
            this.setErrorMessage(eventValue);
        } else if (eventName === "isConnected") {
            this.setIsConnected2Gremlin(eventValue);
        } else {
            this.setState({eventName: eventValue});
        }
    }

    setIsStreaming(status) {
        this.setState({isStreaming: status});
    }

    setstatusCode(statusCode) {
        this.setState({statusCode: statusCode});
    }

    setErrorMessage(message) {
        if (message) {
            this.setState({
                errorMessage: message,
                bottomContentName: "error-console"
            })
        } else {
            this.setState({
                errorMessage: null,
                bottomContentName: null
            })
        }
    }

    setIsConnected2Gremlin(status) {
        console.log("setIsConnected2Gremlin", status)
        this.setState({isConnected2Gremlin: status});
    }

    setStatusMessage(messageText) {
        this.setState({statusMessage: messageText});
    }

    responseEventsCallback(event) {
        console.log("received event", event);
        for (const [key, value] of Object.entries(event)) {
            this.eventTranslator(key, value)
        }
    }

    onResponseCallback(response) {
        // this.resetLoader(); // updates the status of the ui

        this.setState({isQuerying: false});
        this.processResponse(response);
    }

    connect() {
        const requestBuilder = new InvanaEngineQueryManager();

        return new InvanaEngineHTTPConnector(
            this.props.connectionUrl,
            this.responseEventsCallback.bind(this),
            this.onResponseCallback.bind(this),
            requestBuilder
        );
    }

    addQueryToHistory(query, source) {
        let existingHistory = getDataFromLocalStorage(HISTORY_SETTINGS.HISTORY_LOCAL_STORAGE_KEY, true) || [];
        existingHistory.unshift({
            "query": query,
            "source": source,
            "dt": new Date()
        })
        existingHistory = existingHistory.slice(0, HISTORY_SETTINGS.MAX_HISTORY_COUNT_TO_REMEMBER);
        setDataToLocalStorage(HISTORY_SETTINGS.HISTORY_LOCAL_STORAGE_KEY, existingHistory);
    }

    setQueryObject(queryObject) {
        this.setState({queryObject: queryObject});
    }

    setQueryStringFromQueryObject(queryPayload) {
        console.log("===queryPayload", queryPayload);
        if (queryPayload.includes("rawQuery")) {
            const queryString = queryPayload.split('rawQuery(gremlin:"')[1].split('"){id')[0].replaceAll('\\"', '"');
            this.setQueryString(queryString);
        }
    }

    setQueryString(queryString) {
        this.setState({canvasQueryString: queryString});
    }

    makeQuery(queryObj, queryOptions) {

        /*
            queryType = "internal|console|canvas"
         */

        // console.log("=====queryObj", queryObj);
        // TODO - add logic to wait till server connects.


        if (!queryObj.queryKey) {
            queryObj.queryKey = "rawQuery";
        }
        if (typeof queryOptions === "undefined") {
            queryOptions = {}
        }
        if (typeof queryOptions.source === "undefined") {
            queryOptions.source = "internal";
        }
        if (queryOptions.source) {
            this.addQueryToHistory(queryObj, queryOptions.source)
        }

        if (queryObj.queryKey) {
            this.setQueryStringFromQueryObject(queryObj.query);
        }
        this.setState({
            statusMessage: "Fetching data...",
            isQuerying: true
        });
        this.setQueryObject(queryObj);

        console.log("makeQuery :::  query", JSON.stringify(queryObj));
        if (queryObj) {
            this.connector.query(queryObj);
        }
    }

    componentDidMount() {
        console.log("gremlin-component componentDidMount")
        if (this.checkIfConnectionUrlIsValid()) {
            this.connector = this.connect();
        }
        // this.responseSerializer = new InvanaEngineDeSerializer();
    }
}
