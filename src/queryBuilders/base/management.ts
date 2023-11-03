
export default class ManagementQueryManagerBase {

 
    managementGetVertexLabelStats(limit: number, skip: number) {
        throw new TypeError("Please implement abstract method managementGetVertexLabelStats.");
    }

    // eslint-disable-next-line no-unused-vars
    managementGetEdgeLabelStats(limit: number, skip: number) {
        throw new TypeError("Please implement abstract method managementGetEdgeLabelStats.");
    }

}