qx.Class.define("polymita.form.field.net.EMailField", {
    extend: qx.ui.form.TextField,
    include: polymita.form.field.util.MSetProperties,

    statics: {
        cellRendererType: polymita.table.cellrenderer.String,
        validatorClass: polymita.form.validator.net.EMailField,

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

    properties: {
        filter: {
            refine: true,
            init: /[0-9a-zA-Z\.\_\@]/
        }
    }
});
