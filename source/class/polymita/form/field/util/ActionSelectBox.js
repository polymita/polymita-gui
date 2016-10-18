qx.Class.define("polymita.form.field.util.ActionSelectBox", {
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
        qx.core.Init.getApplication().registerActionComponents().forEach(function (item) {
            this.add(new qx.ui.form.ListItem(item.replace('polymita.action.', ''), null, item));
        }, this);
    }
});