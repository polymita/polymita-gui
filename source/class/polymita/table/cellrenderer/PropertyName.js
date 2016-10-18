qx.Class.define("polymita.table.cellrenderer.PropertyName", {
    extend: qx.ui.table.cellrenderer.String,

    /**
     * Constructor
     */
    construct: function () {
        this.base(arguments, 'right', null, null, 'bold');
    },

    members: {
        // overridden
        _getContentHtml: function (cellInfo) {
            if (cellInfo.value) {
                return polymita.I18n.trans('Properties', 'Labels', cellInfo.value);
            }

            return "";
        }
    }
});
