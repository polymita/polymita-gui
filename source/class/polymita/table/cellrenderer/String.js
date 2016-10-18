qx.Class.define("polymita.table.cellrenderer.String", {
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
            settings.gridRendererStyle.textAlign || 'left',
            settings.gridRendererStyle.textColor,
            settings.gridRendererStyle.fontStyle,
            settings.gridRendererStyle.fontWeight
        );
    },

    members: {
        _getContentHtml: function (cellInfo) {
            return qx.bom.String.escape(String(cellInfo.value || ""));
        }
    }
});
