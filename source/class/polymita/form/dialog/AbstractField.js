qx.Class.define("polymita.form.dialog.AbstractField", {
    type: 'abstract',
    extend: polymita.dialog.AbstractForm,

    // override
    construct: function (caption, icon) {
        this.base(arguments, caption, icon);
        this.addListener("close", this.destroy);
    },

    members: {
        _createFormFields: function (form) {

        },

        _createAcceptOrCancelButton: function () {
            var bP = this.__buttonPane,
                bA = new qx.ui.form.Button(this.tr("Accept"), "polymita/icon/16/actions/yes.png"),
                bC = new qx.ui.form.Button(this.tr("Cancel"), "polymita/icon/16/actions/no.png");

            bA.setAllowStretchX(true);
            bC.setAllowStretchX(true);
            this._form.addButton(bA);
            this._form.addButton(bC);

            bA.addListener("execute", function () {
                if (this._form.validate()) {
                    this.fireDataEvent('accept', this.getData());
                    this.close();
                }
            }, this);

            bC.addListener("execute", function () {
                this.fireEvent('cancel', qx.event.type.Event);
                this.close();
            }, this);
        }
    }
});