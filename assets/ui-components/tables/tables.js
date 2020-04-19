class Table {

    /*

      <!--
                <div class="data-table-wrapper mt-3">
                    <div class="data-table-scroller">
                        <table class=" data-table-table table table-bordered" id="data-table-table">
                            <thead class="thead-light">
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
 -->


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
        let _this = this;
        table_headings.forEach(function (key, i) {
            let cell_class = (key === "id") ? ' class="data-table-sticky-col"' : "";
            let v = (typeof row_data[key] === "object") ? _this.stringify_json(row_data[key]) : row_data[key] || "";
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
            let cell_class = (field_name === "id") ? ' class="data-table-sticky-col"':  (field_name === "label") ? ' class="data-table-label-col"'  : "";
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
        if (table_rows.length > 0) {
            tbody.html("");
            table_rows.forEach(function (row) {
                let row_html = _this.create_row(row, table_headings);
                tbody.append(row_html);
            });
        }

        hide_loading();
    }
}

