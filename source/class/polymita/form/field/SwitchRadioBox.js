qx.Class.define("polymita.form.field.SwitchRadioBox", {
    extend: polymita.form.field.util.AbstractSwitchRadioBox,

    statics: {
        cellRendererType: polymita.table.cellrenderer.String,

        properties: {
            onLabel: {
                type: polymita.form.field.TextField,
                settings: { required: true, maxLength: 100, value: 'Common.Labels.On' }
            },
            offLabel: {
                type: polymita.form.field.TextField,
                settings: { required: true, maxLength: 100, value: 'Common.Labels.Off' }
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
        this.base(arguments, 'ON', 'OFF');
    },

    properties: {
        value: {
            check: ['ON', 'OFF'],
            event: 'changeValue',
            apply: '_applyValue',
            transform: '_transformValue'
        },

        onLabel: {
            check: 'String',
            init: 'Common.Labels.On'
        },

        offLabel: {
            check: 'String',
            init: 'Common.Labels.Off'
        }
    }
});