qx.Class.define("polymita.form.field.TextArea", {
    extend: qx.ui.form.TextArea,
    include: [
        polymita.form.field.util.MSetProperties,
        polymita.form.field.util.MPatterns
    ],

    statics: {
        cellRendererType: polymita.table.cellrenderer.String,
        validatorClass: polymita.form.validator.TextArea,

        properties: {
            required: {
                type: polymita.form.field.boolean.CheckBox,
                settings: { value: false }
            },
            minLength: {
                type: polymita.form.field.IntegerField,
                settings: { required: true, minimum: 0, value: 0 }
            },
            maxLength: {
                type: polymita.form.field.IntegerField,
                settings: { required: true, minimum: 0, value: 255 }
            },
            pattern: {
                type: polymita.form.field.TextField,
                settings: { required: true, maxLength: 255, value: '.*' }
            },
            filterIn: {
                type: polymita.form.field.TextField,
                settings: { required: false, maxLength: 255, value: '.' }
            },
            value: {
                type: polymita.form.field.TextField,
                settings: { required: false }
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
    }
});