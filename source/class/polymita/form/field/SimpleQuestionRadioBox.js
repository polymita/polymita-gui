qx.Class.define("polymita.form.field.SimpleQuestionRadioBox", {
    extend: polymita.form.field.util.AbstractSwitchRadioBox,

    statics: {
        cellRendererType: polymita.table.cellrenderer.String,

        properties: {
            yesLabel: {
                type: polymita.form.field.TextField,
                settings: { required: true, maxLength: 100, value: 'Common.Labels.Yes' }
            },
            noLabel: {
                type: polymita.form.field.TextField,
                settings: { required: true, maxLength: 100, value: 'Common.Labels.No' }
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
        this.base(arguments, 'YES', 'NO');
    },

    properties: {
        value: {
            check: ['YES', 'NO'],
            event: 'changeValue',
            apply: '_applyValue',
            transform: '_transformValue'
        },

        yesLabel: {
            check: 'String',
            init: 'Common.Labels.Yes'
        },

        noLabel: {
            check: 'String',
            init: 'Common.Labels.No'
        }
    }
});