qx.Class.define("polymita.table.cellrenderer.LongText", {
    extend: qx.ui.table.cellrenderer.Default,

    members: {
        // overridden
        _getContentHtml: function (cellInfo) {
            if (cellInfo.value) {
                return "<span style='cursor: pointer;' title='" + cellInfo.value + "'>" + cellInfo.value + "</span>";
            }

            return "";
        }
    }
});
