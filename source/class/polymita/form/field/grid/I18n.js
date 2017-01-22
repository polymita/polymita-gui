/**
 * @childControl dlg {polymita.form.dialog.GridI18n} Form dialog.
 */
qx.Class.define("polymita.form.field.grid.I18n", {
    extend: qx.ui.form.Button,
    implement: [
        qx.ui.form.IStringForm,
        qx.ui.form.IForm
    ],
    include: [
        qx.ui.form.MForm,
        polymita.form.field.util.MSetProperties,
        polymita.form.field.util.MReadOnly
    ],

    statics: {
        cellRendererType: polymita.table.cellrenderer.String,

        properties: {
            required: {
                type: polymita.form.field.boolean.CheckBox,
                settings: { value: false }
            },
            gridRendererStyle: {
                type: 'polymita.form.field.grid.RendererStyle',
                settings: { required: true, value: '{}' }
            }
        }
    },

    // override
    construct: function () {
        this.base(arguments, '{...}');
        this.addListener('execute', this._onOpenDlg, this);
    },

    events: {
        /** Fired when the value was modified */
        "changeValue": "qx.event.type.Data"
    },

    properties: {
        value: {
            check: 'Object',
            init: null,
            event: 'changeValue',
            transform: '_transformValue'
        }
    },

    members: {
        _transformValue: function (value) {
            return qx.lang.Type.isString(value) ? qx.lang.Json.parse(value) : value;
        },

        _onOpenDlg: function (e) {
            if (!this.isReadOnly()) {
                var dlg = new polymita.form.dialog.GridI18n();

                dlg.setData(this.getValue());
                dlg.addListener('accept', function (e) {
                    this.setValue(e.getData());
                    dlg.close();
                }, this);

                dlg.open();
            }
        }
    }
});