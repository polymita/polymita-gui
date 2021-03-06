qx.Class.define("polymita.form.field.safety.PatternSelectBox", {
    extend: polymita.form.field.util.AbstractSelectBox,

    statics: {
        cellRendererType: polymita.table.cellrenderer.Pattern,

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

        var request = new polymita.request.I18ns(true);
        request.findAll('name', { subCatalog: 'Patterns' }, function (response) {
            if (response.successful) {
                response.data.forEach(function (item) {
                    var label = polymita.I18n.trans('Patterns', 'Labels', item.name);
                    this.add(new qx.ui.form.ListItem(label, null, item.value));
                }, this);
            } else {
                var msg = polymita.I18n.trans('Common', 'Messages', 'FAILED LOAD');
                q.messaging.emit('Application', 'error', msg);
            }
        }, this);
    }
});