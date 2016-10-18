qx.Class.define("polymita.form.field.GenderRadioBox", {
    extend: polymita.form.field.util.AbstractSwitchRadioBox,

    statics: {
        cellRendererType: polymita.table.cellrenderer.String,

        properties: {
            mLabel: {
                type: polymita.form.field.TextField,
                settings: { required: true, maxLength: 100, value: 'Common.Labels.Male' }
            },
            fLabel: {
                type: polymita.form.field.TextField,
                settings: { required: true, maxLength: 100, value: 'Common.Labels.Female' }
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
        this.base(arguments, 'M', 'F');
    },

    properties: {
        value: {
            check: ['M', 'F'],
            event: 'changeValue',
            apply: '_applyValue',
            transform: '_transformValue'
        },

        mLabel: {
            check: 'String',
            init: 'Common.Labels.Male'
        },

        fLabel: {
            check: 'String',
            init: 'Common.Labels.Female'
        }
    }
});