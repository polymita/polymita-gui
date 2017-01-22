qx.Class.define("polymita.form.field.util.I18nActionName", {
    extend: polymita.form.field.TextField,

    statics: {
        cellRendererType: polymita.table.cellrenderer.I18nActionName,

        properties: {
            gridColumnWidth: {
                type: polymita.form.field.grid.ColumnWidth,
                settings: {}
            },
            gridRendererStyle: {
                type: polymita.form.field.grid.RendererStyle,
                settings: { required: true, value: '{}' }
            }
        }
    }
});