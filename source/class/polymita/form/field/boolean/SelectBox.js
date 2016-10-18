qx.Class.define("polymita.form.field.boolean.SelectBox", {
    extend: polymita.form.field.util.AbstractSelectBox,

    statics: {
        cellRendererType: polymita.table.cellrenderer.Boolean,

        properties: {
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
        this.base(arguments);
        this.setRequired(true);
        this.add(new qx.ui.form.ListItem(this.tr('Common.Labels.True'), null, 'true'));
        this.add(new qx.ui.form.ListItem(this.tr('Common.Labels.False'), null, 'false'));
    }
});