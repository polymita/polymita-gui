qx.Class.define("polymita.form.field.safety.ACLPermission", {
    extend: polymita.form.field.util.AbstractSelectBox,

    statics: {
        cellRendererType: polymita.table.cellrenderer.ACLPermission,

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

        // Add options.
        this.add(new qx.ui.form.ListItem(polymita.I18n.trans('Safety', 'Labels', 'NONE'), null, 0));           //0000
        this.add(new qx.ui.form.ListItem(polymita.I18n.trans('Safety', 'Labels', 'READ'), null, 1));           //0001
        this.add(new qx.ui.form.ListItem(polymita.I18n.trans('Safety', 'Labels', 'READ & EXECUTE'), null, 3)); //0011
        this.add(new qx.ui.form.ListItem(polymita.I18n.trans('Safety', 'Labels', 'READ & WRITE'), null, 5));   //0101
        this.add(new qx.ui.form.ListItem(polymita.I18n.trans('Safety', 'Labels', 'READ & DELETE'), null, 9));  //1001
        this.add(new qx.ui.form.ListItem(polymita.I18n.trans('Safety', 'Labels', 'ALL'), null, 15));           //1111
    }
});