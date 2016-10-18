qx.Class.define("polymita.form.dialog.Test", {
    extend: polymita.form.dialog.AbstractField,

    /**
     * Constructor
     *
     * @param management {polymita.management.AbstractManagement}
     * @param action {String} Action id: ('add' or 'edit') value.
     * @param caption {String} The caption text.
     * @param icon {String} The URL of the caption bar icon.
     */
    construct: function (management, action, caption, icon) {
        var properties = management.getSettings().properties;

        this.set({
            management: management,
            height: properties.formHeight,
            width: properties.formWidth,
            action: action
        });

        this.base(arguments, caption, icon);
    },

    properties: {
        management: {
            check: 'polymita.management.AbstractManagement'
        },

        action: {
            check: 'String'
        }
    },

    members: {
        _createFormFields: function (form) {
            this.base(arguments);

            var field = new polymita.form.field.grid.RendererStyle();
            form.add(field, this.tr("Value"), null, "value");

            this._field = field;
        }
    }
});