qx.Class.define("polymita.form.field.TextField", {
    extend: qx.ui.form.TextField,
    include: polymita.form.field.util.MSetProperties,

    statics: {
        cellRendererType: polymita.table.cellrenderer.String,
        validatorClass: polymita.form.validator.TextField,

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
                type: 'polymita.form.field.TextField',
                settings: { required: true, maxLength: 255, value: '.*' }
            },
            filterIn: {
                type: 'polymita.form.field.TextField',
                settings: { required: false, maxLength: 255, value: '.' }
            },
            value: {
                type: 'polymita.form.field.TextField',
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
    },

    properties: {
        pattern: {
            check: 'String',
            init: '.*'
        },

        filterIn: {
            check: 'String',
            nullable: true,
            apply: '__applyFilterIn'
        },

        minLength: {
            check: 'Integer',
            init: 0
        }
    },

    members: {
        /**
         * Create an set filter value with new RegExp from given string in filterIn property.
         * @param value {String} Regular expression as string.
         */
        __applyFilterIn: function (value) {
            this.setFilter(new RegExp(value));
        }
    }
});