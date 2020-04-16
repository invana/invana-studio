$(document).ready(function () {
    console.log("ready!");


    class Table {

        /*

        Example Usage :
            var table_headings = ["id", "name", "age"];
            var table_data = [
                {
                    "id": 1,
                    "name": "Ravi",
                    "age": 30,
                },
                {
                    "id": 2,
                    "name": "Roja",
                    "age": 25,
                },
            ]
            let table = new Table();
            table.render("#data-table-table", table_headings, table_data)

         */
        stringify_json(d) {
            return JSON.stringify(d);
        }

        create_row(row_data, table_headings) {
            let tr = $("<tr></tr>");
            var cell_html = null;
            cell_html = "td";
            var cell_class = null;
            let _this = this;
            table_headings.forEach(function (key, i) {
                let cell_class = (key === "id") ? ' class="data-table-sticky-col"' : "";
                let v = (key === "payload" || key === "sender_info" || key === "receiver_info") ? _this.stringify_json(row_data[key]) : row_data[key];
                const row_datum_html = '<span class="cell-content">' + v + '</span>';
                tr.append("<" + cell_html + cell_class + " data-cell-fieldname='" + key + "'>" +
                    row_datum_html + "</" + cell_html + ">");
            });
            return tr;
        }

        create_head(table_headings) {
            const cell_html = "th";
            let tr = $("<tr></tr>");
            table_headings.forEach(function (field_name) {
                let cell_class = (field_name === "id") ? ' class="data-table-sticky-col"' : "";
                let cell_heading_content = '<span class="cell-content">' + field_name + '</span>';
                tr.append("<" + cell_html + cell_class + " data-cell-fieldname='" + field_name + "'>" + cell_heading_content + "</" + cell_html + ">");
            });
            return tr;
        }

        render(table_selector, table_headings, table_rows) {
            show_loading()
            let table = $(table_selector)

            let thead = $(table_selector + " thead");
            let tbody = $(table_selector + " tbody");
            thead.html('');
            tbody.html('');

            const tr = this.create_head(table_headings);
            thead.append(tr);

            let _this = this;
            if (table_data.length > 0) {
                $(table_selector + " tbody").html("");

                table_data.forEach(function (row) {
                    let row_html = _this.create_row(row, table_headings);
                    tbody.append(row_html);
                });
            }

            hide_loading();
        }
    }


});