qx.Class.define("polymita.table.cellrenderer.GridRendererStyle", {
    extend: qx.ui.table.cellrenderer.Default,

    members: {
        // overridden
        _getContentHtml: function (cellInfo) {
            if (cellInfo.value) {
                return '<div style="text-align: center;">{...}</div>';
            }
        }
    }
});
