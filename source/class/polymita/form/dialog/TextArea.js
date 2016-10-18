qx.Class.define("polymita.form.dialog.TextArea", {
    extend: polymita.form.dialog.AbstractField,

    members: {
        _createFormFields: function (form) {
            this.base(arguments);

            var field = new qx.ui.form.TextArea();
            field.setWidth(260);
            form.add(field, this.tr("Value"), null, "value");

            this._field = field;

            this.addListener("appear", function (e) {
                this._field.focus();
                this._field.setTextSelection(0, this._field.getValue().length);
            }, this);
        }
    }
});