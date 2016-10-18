qx.Class.define("polymita.table.cellrenderer.Date", {
    extend: qx.ui.table.cellrenderer.Date,

    /**
     * Constructor
     *
     * @param settings {Map} Settings to apply to the cell renderer.
     * <pre class='javascript'>
     *     new polymita.table.cellrenderer.Date({
     *          gridRendererStyle: {
     *              aling: "center",
     *              color: "red",
     *              fontStyle: "italic",
     *              fontWeight: "bold"
     *          },
     *          strDateFormat: "YYYY-MM-DD HH:mm:ss"
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

        this.setDateFormat(new qx.util.format.DateFormat(settings.strDateFormat || null));
    }
});
