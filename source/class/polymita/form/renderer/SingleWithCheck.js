qx.Class.define("polymita.form.renderer.SingleWithCheck", {
    extend: qx.ui.form.renderer.Single,

    //override
    construct: function (form) {
        this.base(arguments, form);

        var layout = this.getLayout();

        layout.setColumnFlex(1, 0);
        layout.setColumnFlex(2, 1);
        layout.setColumnAlign(0, "left", "top");
        layout.setColumnAlign(1, "right", "top");
    },

    members: {
        //override
        addItems: function (items, names, title) {
            // add the header
            if (title != null) {
                this._add(this._createHeader(title), { row: this._row, column: 0, colSpan: 3 });
                this._row++;
            }

            // add the items
            for (var i = 0; i < items.length; i++) {
                var label = this._createLabel(names[i], items[i]),
                    check = this._createCheckBox(items[i]);

                this._add(check, { row: this._row, column: 0 });
                this._add(label, { row: this._row, column: 1 });
                this._add(items[i], { row: this._row, column: 2 });

                this._connectVisibility(items[i], label);
                this._connectVisibility(items[i], check);

                label.setBuddy(items[i]);
                this.getLayout().setRowFlex(this._row, 1);

                this._row++;

                // store the names for translation
                if (qx.core.Environment.get("qx.dynlocale")) {
                    this._names.push({ name: names[i], label: label, item: items[i] });
                }
            }
        },

        //override
        addButton: function (button) {
            if (this._buttonRow == null) {
                // create button row
                this._buttonRow = new qx.ui.container.Composite();
                this._buttonRow.setMarginTop(5);
                var hbox = new qx.ui.layout.HBox();
                hbox.setAlignX("right");
                hbox.setSpacing(5);
                this._buttonRow.setLayout(hbox);
                // add the button row
                this._add(this._buttonRow, { row: this._row, column: 0, colSpan: 3 });
                this.getLayout().setRowFlex(this._row, 0);
                // increase the row
                this._row++;
            }

            // add the button
            this._buttonRow.add(button);
        },

        _createCheckBox: function (item) {
            var check = new qx.ui.form.CheckBox();

            check.bind("value", item, "enabled");

            return check;
        }
    }
});