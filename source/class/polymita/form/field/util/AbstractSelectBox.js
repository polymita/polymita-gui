qx.Class.define("polymita.form.field.util.AbstractSelectBox", {
    type: 'abstract',
    extend: qx.ui.form.SelectBox,
    include: [
        polymita.form.field.util.MSetProperties,
        polymita.form.field.util.MReadOnly
    ],

    construct: function () {
        this.base(arguments);
        this.addListener('changeRequired', this._onChangeRequired, this);
    },

    members: {
        _onKeyPress: function (e) {
            if (!this.isReadOnly()) {
                this.base(arguments, e);
            }
        },

        /**
         * Fired when change value in required property.
         *
         * @param e {qx.event.type.Data}
         */
        _onChangeRequired: function (e) {
            if (!this._blanckItem) {
                this._blanckItem = new qx.ui.form.ListItem('-', null, '#NULL#');
            }

            if (e.getData() == false) {
                this.addAt(this._blanckItem, 0);
            } else if (this.indexOf(this._blanckItem) != -1) {
                this.remove(this._blanckItem);
            }
        },

        open: function () {
            if (!this.isReadOnly()) {
                this.base(arguments);
            }
        }
    }
});