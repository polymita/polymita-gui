/**
 * @asset(qx/icon/${qx.icontheme}/16/apps/office-calendar.png)
 */
qx.Class.define("polymita.form.field.DateField", {
    extend: qx.ui.form.DateField,
    include: [
        polymita.form.field.util.MSetProperties,
        polymita.form.field.util.MReadOnly
    ],

    statics: {
        cellRendererType: polymita.table.cellrenderer.Date,

        properties: {
            required: {
                type: polymita.form.field.boolean.CheckBox,
                settings: { value: false }
            },
            strDateFormat: {
                type: polymita.form.field.TextField,
                settings: { required: true }
            },
            value: {
                type: 'polymita.form.field.DateField',
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
        },

        parseValue: function (value) {
            return new Date(value);
        }
    },

    properties: {
        strDateFormat: {
            check: 'String',
            apply: '_applyStrDateFormat'
        }
    },

    members: {
        _applyStrDateFormat: function (value) {
            this.setDateFormat(new qx.util.format.DateFormat(value));
        },

        validate: function (form) {
            var value = this.getValue();

            if (value == null && this.isRequired()) {
                return this.tr('This field is required');
            }

            return true;
        }
    }
});