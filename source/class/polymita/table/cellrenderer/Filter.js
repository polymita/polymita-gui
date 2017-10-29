/**
 * @ignore(Map)
 */
qx.Class.define("polymita.table.cellrenderer.Filter", {
    extend: polymita.table.cellrenderer.String,

    members: {
        // override
        _getContentHtml: function (cellInfo) {
            var value = String(cellInfo.value || ""),
                filter = polymita.I18n.trans('Filters', 'Values', value, false) || value,
                title = polymita.I18n.trans('Filters', 'Labels', value, false) || value;

            return qx.bom.Template.render('<span title="{{t}}">{{p}}</span>', { t: title, p: filter });
        }
    }
});
