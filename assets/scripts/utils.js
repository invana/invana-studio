function show_notification(txt) {
    document.getElementById("notifications-div").innerText = txt;
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function show_loading() {
    $(".page-loading").show();
}

function hide_loading() {
    $(".page-loading").hide();

}

function get_heading_fields(json_data) {
    let first_row = json_data[0];
    return Object.keys(first_row)
}