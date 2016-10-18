qx.Class.define("polymita.form.field.util.ManagementSelectBox", {
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
        qx.core.Init.getApplication().registerManagementComponents().forEach(function (item) {
            this.add(new qx.ui.form.ListItem(item.replace('polymita.management.', ''), null, item));
        }, this);
    }
});