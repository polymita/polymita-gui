/**
 * @childControl dlg {polymita.form.dialog.HtmlEditor} Form dialog.
 */
qx.Class.define("polymita.form.field.util.Html", {
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
        this.base(arguments, '...');
        this.addListener('execute', this._onOpenDlg, this);
    },

    events: {
        /** Fired when the value was modified */
        "changeValue": "qx.event.type.Data"
    },

    properties: {
        value: {
            check: 'String',
            init: '',
            event: 'changeValue'
        }
    },

    members: {
        _onOpenDlg: function (e) {
            if (!this.isReadOnly()) {
                var dlg = new polymita.form.dialog.HtmlEditor();

                dlg.setData({ content: this.getValue() });
                dlg.addListener('accept', function (e) {
                    this.setValue(e.getData().content);
                    dlg.close();
                }, this);

                dlg.open();
            }
        }
    }
});