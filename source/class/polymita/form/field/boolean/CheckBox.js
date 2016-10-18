qx.Class.define("polymita.form.field.boolean.CheckBox", {
    extend: qx.ui.form.CheckBox,
    include: polymita.form.field.util.MSetProperties,

    statics: {
        cellRendererType: polymita.table.cellrenderer.Boolean,

        properties: {
            gridColumnWidth: {
                type: 'polymita.form.field.IntegerField',
                settings: { required: true, minimum: 10, value: 80 }
            }
        },

        parseValue: function (value) {
            if (qx.lang.Type.isString(value)) {
                value = value.toLowerCase();
            }

            return value === true || value === 'true' || value === 'on' || value === 1 || value === '1';
        }
    },

    // override
    construct: function (label) {
        this.base(arguments, label);
        this.setAlignY('middle');
    }
});