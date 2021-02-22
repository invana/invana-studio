import RemoteEngine from "../../layout/remote";
import RoutableRemoteEngine from "../../layout/routable-remote";


export default class LabelDetailViewBase extends RoutableRemoteEngine {


    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            // labelName: this.props.match.params.labelName,
            // labelType: this.props.match.params.labelType,
            // viewType: this.props.match.params.viewType,
            totalCount: "NA" // TODO - get this from the API call
        }
    }


}
