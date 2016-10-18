qx.Class.define("polymita.table.cellrenderer.I18nActionName", {
    extend: polymita.table.cellrenderer.String,

    members: {
        _getContentHtml: function (cellInfo) {
            var text = '';

            if (cellInfo.value) {
                var parts = String(cellInfo.value).split('/'),
                    action = polymita.I18n.trans('Services', 'Actions', parts.pop()),
                    controller = polymita.I18n.trans('Services', 'Controllers', parts.join('/'));

                text = polymita.I18n.trans('Services', 'Labels', 'ACTION_RECORDS_OF_CONTROLLER', [action, controller]);
            }

            return qx.bom.String.escape(text);
        }
    }
});
