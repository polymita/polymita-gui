qx.Class.define("polymita.form.field.safety.PasswordField", {
    extend: qx.ui.form.PasswordField,
    include: [
        polymita.form.field.util.MSetProperties,
        polymita.form.field.util.MPatterns
    ],

    statics: {
        cellRendererType: polymita.table.cellrenderer.String,
        validatorClass: polymita.form.validator.TextField,

        properties: {
            required: {
                type: polymita.form.field.boolean.CheckBox,
                settings: { value: true }
            },
            minLength: {
                type: polymita.form.field.IntegerField,
                settings: { required: true, minimum: 4, value: 4 }
            },
            maxLength: {
                type: polymita.form.field.IntegerField,
                settings: { required: true, minimum: 4, value: 255 }
            },
            value: {
                type: polymita.form.field.TextField,
                settings: { required: false }
            },
            pattern: {
                type: polymita.form.field.TextField,
                settings: {
                    required: true,
                    maxLength: 255,
                    // Contain uppercase and lowercase letters, digits, spaces and special char and length >= 6.
                    value: '^.*(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_ "]).*$'
                }
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