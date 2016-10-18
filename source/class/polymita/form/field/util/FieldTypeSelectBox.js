qx.Class.define("polymita.form.field.util.FieldTypeSelectBox", {
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
        this.setRequired(true);
        qx.core.Init.getApplication().registerFormFieldComponents().forEach(function (item) {
            this.add(new qx.ui.form.ListItem(item.replace('polymita.form.field.', ''), null, item));
        }, this);
    }
});