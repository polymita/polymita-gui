qx.Class.define("polymita.form.field.util.FieldValidatorSelectBox", {
    extend: polymita.form.field.util.AbstractSelectBox,

    statics: {
        cellRendererType: polymita.table.cellrenderer.String,

        properties: {
            gridColumnWidth: {
                type: polymita.form.field.grid.ColumnWidth,
                settings: {}
            }
        }
    },

    construct: function () {
        this.base(arguments);
        this.setRequired(false);
        this.add(new qx.ui.form.ListItem(polymita.I18n.trans('Common', 'Labels', 'Default'), null, '#NULL#'));
        qx.core.Init.getApplication().registerFormFieldValidators().forEach(function (item) {
            this.add(new qx.ui.form.ListItem(item.replace('polymita.form.validator.', ''), null, item));
        }, this);
    }
});