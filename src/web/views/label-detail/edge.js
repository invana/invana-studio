import LabelDetailViewBase from "./base";


export default class EdgeLabelDetailView extends LabelDetailViewBase {

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            labelType: "edge"
        }
    }

    goToNextPage() {
        const nextPageNumber = this.state.pageNumber + 1
        this.setState({pageNumber: nextPageNumber})
        const showVerticesQuery = this.connector.requestBuilder.filterEdges(
            this.state.labelName,
            this.state.pageSize,
            this.skipCount(nextPageNumber));
        const queryPayload = this.connector.requestBuilder.combineQueries(showVerticesQuery, null)
        this.makeQuery(queryPayload);
    }

    goToPrevPage() {
        const prevPageNumber = this.state.pageNumber - 1;
        this.setState({pageNumber: prevPageNumber})
        const showVerticesQuery = this.connector.requestBuilder.filterEdges(
            this.state.labelName,
            this.state.pageSize,
            this.skipCount(prevPageNumber));
        const queryPayload = this.connector.requestBuilder.combineQueries(showVerticesQuery, null)
        this.makeQuery(queryPayload);
    }


    componentDidMount() {
        console.log("====== this.connector", this.connector.requestBuilder);
        const showVerticesQuery = this.connector.requestBuilder.filterEdges(this.state.labelName,
            this.state.pageSize, this.skipCount(this.state.pageNumber));
        const queryPayload = this.connector.requestBuilder.combineQueries(showVerticesQuery, null)
        this.makeQuery(queryPayload);
    }

    processResponse(response) {
        const lastResponse = response.getResponseResult();
        console.log("lastResponse", lastResponse)
        if (lastResponse) {
            this.setState({
                elementsData: response.getResponseResult(
                    this.connector.requestBuilder.filterEdges().queryKey
                )
            })
        }
    }


}
