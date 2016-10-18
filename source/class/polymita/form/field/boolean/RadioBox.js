qx.Class.define("polymita.form.field.boolean.RadioBox", {
    extend: polymita.form.field.util.AbstractSwitchRadioBox,

    statics: {
        cellRendererType: polymita.table.cellrenderer.Boolean,

        properties: {
            trueLabel: {
                type: polymita.form.field.TextField,
                settings: { required: true, maxLength: 100, value: 'Common.Labels.True' }
            },
            falseLabel: {
                type: polymita.form.field.TextField,
                settings: { required: true, maxLength: 100, value: 'Common.Labels.False' }
            },
            gridColumnWidth: {
                type: polymita.form.field.grid.ColumnWidth,
                settings: {}
            }
        },

        parseValue: function (value) {
            if (qx.lang.Type.isString(value)) {
                value = value.toLowerCase();
            }

            return value === true || value === 'true' || value === 'on' || value === 1 || value === '1';
        }
    },

    construct: function () {
        this.base(arguments, true, false);
    },

    properties: {
        value: {
            check: 'Boolean',
            event: 'changeValue',
            apply: '_applyValue'
        },

        trueLabel: {
            check: 'String',
            init: 'Common.Labels.True'
        },

        falseLabel: {
            check: 'String',
            init: 'Common.Labels.False'
        }
    }
});