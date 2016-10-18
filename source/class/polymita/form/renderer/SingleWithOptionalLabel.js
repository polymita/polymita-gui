qx.Class.define("polymita.form.renderer.SingleWithOptionalLabel", {
    extend: qx.ui.form.renderer.Single,

    //override
    construct: function (form) {
        this.base(arguments, form);

        var layout = this.getLayout();

        layout.setColumnFlex(0, 0);
        layout.setColumnFlex(1, 1);
    },

    members: {
        //override
        addItems: function (items, names, title) {
            // add the header
            if (title != null) {
                this._add(
                    this._createHeader(title), { row: this._row, column: 0, colSpan: 2 }
                );
                this._row++;
            }

            // add the items
            for (var i = 0; i < items.length; i++) {
                if (names[i] && names[i] != '') {
                    var label = this._createLabel(names[i], items[i]);

                    this._add(label, { row: this._row, column: 0 });
                    label.setBuddy(items[i]);

                    this._add(items[i], { row: this._row, column: 1 });

                    this._connectVisibility(items[i], label);
                } else {
                    this._add(items[i], { row: this._row, column: 0, colSpan: 2 });
                }

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
                this.getLayout().setRowFlex(this._row, 0);
            }
            this.base(arguments, button);
        }
    }
});