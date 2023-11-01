

export function renderPropertyData(key: string, value: any) {
    // console.log("renderPropertyData", key, typeof value, typeof value === "object", value instanceof Boolean, value,);
    if (typeof value === "boolean") {
        return value.toString();
    } else if (value === null) {
        return "None";
    } else if (Array.isArray(value)) {
        return value;
    } else if (typeof value === "object" && value['@value'] && value['@value'].coordinates) {
        // geo coordinates
        return "(" + value['@value'].coordinates[0] + "," + value['@value'].coordinates[1] + ")";
    }
    return value;
}
