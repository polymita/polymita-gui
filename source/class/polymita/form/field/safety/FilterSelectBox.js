qx.Class.define("polymita.form.field.safety.FilterSelectBox", {
    extend: polymita.form.field.util.AbstractSelectBox,

    statics: {
        cellRendererType: polymita.table.cellrenderer.Filter,

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

        var request = new polymita.request.Filters(true);
        request.findAll('name', null, function (response) {
            if (response.successful) {
                response.data.forEach(function (item) {
                    this.add(new qx.ui.form.ListItem(item.name, null, item.pattern));
                }, this);
            } else {
                var msg = polymita.I18n.trans('Common', 'Messages', 'FAILED LOAD');
                q.messaging.emit('Application', 'error', msg);
            }
        }, this);
    }
});