qx.Class.define("polymita.table.cellrenderer.ACLPermission", {
    extend: qx.ui.table.cellrenderer.String,

    /**
     * Constructor
     *
     * @param settings {Map} Settings to apply to the cell renderer.
     * <pre class='javascript'>
     *     new polymita.table.cellrenderer.String({
     *          gridRendererStyle: {
     *              aling: "center",
     *              color: "red",
     *              fontStyle: "italic",
     *              fontWeight: "bold"
     *          }
     *     })
     * </pre>
     */
    construct: function (settings) {
        settings.gridRendererStyle = settings.gridRendererStyle || {};
        this.base(arguments,
            settings.gridRendererStyle.textAlign || 'center',
            settings.gridRendererStyle.textColor,
            settings.gridRendererStyle.fontStyle,
            settings.gridRendererStyle.fontWeight
        );
    },

    members: {
        _getContentHtml: function (cellInfo) {
            var index = String(cellInfo.value || 0),
                labels = {
                    00: 'NONE',
                    01: 'READ',
                    03: 'READ & EXECUTE',
                    05: 'READ & WRITE',
                    09: 'READ & DELETE',
                    15: 'ALL'
                }

            return qx.bom.String.escape(polymita.I18n.trans('Safety', 'Labels', labels[index]));
        }
    }
});
