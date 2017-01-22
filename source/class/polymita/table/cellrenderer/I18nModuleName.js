qx.Class.define("polymita.table.cellrenderer.I18nModuleName", {
    extend: polymita.table.cellrenderer.String,

    members: {
        _getContentHtml: function (cellInfo) {
            var text = '';

            if (cellInfo.rowData) {
                text = polymita.I18n.trans(cellInfo.rowData.i18nCatalog, 'Labels', 'MODULE-REFERENCE');
            }

            return qx.bom.String.escape(text);
        }
    }
});
