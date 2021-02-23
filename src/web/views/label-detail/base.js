import RoutableRemoteEngine from "../../layout/routable-remote";


export default class LabelDetailViewBase extends RoutableRemoteEngine {

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            totalCount: "NA"
        }
    }

}
