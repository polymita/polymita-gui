qx.Class.define("polymita.form.field.util.FormAccessBox", {
    extend: polymita.form.field.util.AbstractSelectBox,

    statics: {
        cellRendererType: polymita.table.cellrenderer.FormAccessBox,

        properties: {
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
        this.base(arguments);
        this.setRequired(true);

        var items = ['NONE', 'HIDDEN', 'READ', 'WRITE'];

        items.forEach(function (item, index) {
            this.add(new qx.ui.form.ListItem(polymita.I18n.trans('Forms', 'Access', item), null, item[0]));
        }, this);
    }
});