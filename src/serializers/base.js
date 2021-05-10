/*

 */

export default class DeSerializerBase {

    /*

const serializedData = _this.responseSerializer.process(response.getResponseData());
const separatedData = _this.responseSerializer.separateVerticesAndEdges(serializedData);



     */
    processItem(item) {
        throw new TypeError("Please implement abstract method processItem. Ignoring", item);

    }

    convertList2Json(list_item) {
        throw new TypeError("Please implement abstract method convertList2Json. Ignoring", list_item);
    }

    separateVerticesAndEdges(items) {
        throw new TypeError("Please implement abstract method separateVerticesAndEdges. " +
            "Ignoring", items);
    }

    process(data) {
        return this.convertList2Json(data);
    }
}
