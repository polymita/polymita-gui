/**
 * @ignore(Map)
 */
qx.Class.define("polymita.table.cellrenderer.Pattern", {
    extend: polymita.table.cellrenderer.String,

    members: {
        // override
        _getContentHtml: function (cellInfo) {
            var value = String(cellInfo.value || ""),
                pattern = polymita.I18n.trans('Patterns', 'Values', value, false) || value,
                title = polymita.I18n.trans('Patterns', 'Labels', value, false) || value;

            return qx.bom.Template.render('<span title="{{t}}">{{p}}</span>', { t: title, p: pattern });
        }
    }
});
