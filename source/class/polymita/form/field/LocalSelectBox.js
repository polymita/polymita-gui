qx.Class.define("polymita.form.field.LocalSelectBox", {
    extend: polymita.form.field.util.AbstractSelectBox,

    statics: {
        cellRendererType: polymita.table.cellrenderer.String,

        properties: {
            options: {
                type: polymita.form.field.TextField,
                settings: { required: true, value: '[{"label":"op1","value":"v1"}]' }
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
        options: {
            check: 'String',
            init: '[]',
            apply: '_applyOptions'
        }
    },

    members: {
        _applyOptions: function (value) {
            var options = qx.lang.Json.parse(value);

            options.forEach(function (item) {
                this.add(new qx.ui.form.ListItem(item.label, null, item.value));
            }, this);
        }
    }
});