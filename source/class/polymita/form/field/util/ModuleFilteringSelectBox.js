qx.Class.define("polymita.form.field.util.ModuleFilteringSelectBox", {
    extend: polymita.form.field.remote.FilteringSelectBox,
    include: polymita.form.field.util.MSetProperties,

    statics: {
        cellRendererType: polymita.table.cellrenderer.Module,

        properties: {
            required: {
                type: polymita.form.field.boolean.CheckBox,
                settings: { value: false }
            },
            gridColumnWidth: {
                type: polymita.form.field.grid.ColumnWidth,
                settings: {}
            },
            gridRendererStyle: {
                type: polymita.form.field.grid.RendererStyle,
                settings: { required: true, value: '{}' }
            }
        }
    },

    construct: function () {
        this.base(arguments, '/modules', 'title', 'id');
    }
});