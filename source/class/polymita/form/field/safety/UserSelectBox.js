qx.Class.define("polymita.form.field.safety.UserSelectBox", {
    extend: polymita.form.field.util.AbstractSelectBox,

    statics: {
        cellRendererType: polymita.table.cellrenderer.User,

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

        var request = new polymita.request.Users(true);
        request.findAll('name', null, function (response) {
            if (response.successful) {
                response.data.forEach(function (item) {
                    this.add(new qx.ui.form.ListItem(item.name, null, item.id));
                }, this);
            } else {
                var msg = polymita.I18n.trans('Common', 'Messages', 'FAILED LOAD');
                q.messaging.emit('Application', 'error', msg);
            }
        }, this);
    }

});
