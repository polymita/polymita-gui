qx.Class.define("polymita.form.field.remote.RestSelectBox", {
    extend: polymita.form.field.util.AbstractSelectBox,

    statics: {
        cellRendererType: polymita.table.cellrenderer.String,

        properties: {
            required: {
                type: polymita.form.field.boolean.CheckBox,
                settings: { value: false }
            },
            restServiceURL: {
                type: polymita.form.field.TextField,
                settings: { required: true, maxLength: 255, value: '/restServiceURL' }
            },
            valueAttr: {
                type: polymita.form.field.TextField,
                settings: { required: true, maxLength: 30, value: 'id' }
            },
            labelAttr: {
                type: polymita.form.field.TextField,
                settings: { required: true, maxLength: 30, value: 'label' }
            },
            placeholder: {
                type: polymita.form.field.TextField,
                settings: { required: false, maxLength: 100, value: null }
            },
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

    properties: {
        restServiceURL: {
            check: 'String',
            init: '/restServiceURL',
            apply: '_applyRestServiceURL'
        },

        valueAttr: {
            check: 'String',
            init: 'id'
        },

        labelAttr: {
            check: 'String',
            init: 'title'
        }
    },

    members: {
        _applyRestServiceURL: function (url) {
            var request = new polymita.request.Customs(url, true);
            request.findAll(this.getLabelAttr(), null, function (response) {
                if (response.successful) {
                    response.data.forEach(function (item) {
                        this.add(new qx.ui.form.ListItem(item[this.getLabelAttr()], null, item[this.getValueAttr()]));
                    }, this);
                } else {
                    var msg = polymita.I18n.trans('Common', 'Messages', 'FAILED LOAD');
                    q.messaging.emit('Application', 'error', msg);
                }
            }, this);
        }
    }
});