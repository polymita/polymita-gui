qx.Class.define("polymita.form.field.IntegerField", {
    extend: polymita.form.field.NumberField,

    statics: {
        cellRendererType: polymita.table.cellrenderer.Number,

        properties: {
            required: {
                type: polymita.form.field.boolean.CheckBox,
                settings: { value: false }
            },
            minimum: {
                type: 'polymita.form.field.IntegerField',
                settings: { required: true, value: Number.MIN_SAFE_INTEGER }
            },
            maximum: {
                type: 'polymita.form.field.IntegerField',
                settings: { required: true, value: Number.MAX_SAFE_INTEGER }
            },
            value: {
                type: 'polymita.form.field.IntegerField',
                settings: { required: false, value: 1 }
            },
            singleStep: {
                type: 'polymita.form.field.IntegerField',
                settings: { required: true, value: 1 }
            },
            gridColumnWidth: {
                type: polymita.form.field.grid.ColumnWidth,
                settings: {}
            },
            gridRendererStyle: {
                type: polymita.form.field.grid.RendererStyle,
                settings: { required: true, value: '{}' }
            }
        },

        parseValue: function (value) {
            var n = new Number(value);
            return n.valueOf();
        }
    },

    properties: {
        /** The value of the spinner. */
        value: {
            refine: true,
            init: ""
        },

        minimum: {
            refine: true,
            init: Number.MIN_SAFE_INTEGER
        },

        maximum: {
            refine: true,
            init: Number.MAX_SAFE_INTEGER
        }
    },

    members: {}
});