qx.Class.define("polymita.table.cellrenderer.Number", {
    extend: qx.ui.table.cellrenderer.Number,

    /**
     * Constructor
     *
     * @param settings {Map} Settings to apply to the cell renderer.
     * <pre class='javascript'>
     *     new polymita.table.cellrenderer.Number({
     *          gridRendererStyle: {
     *              aling: "center",
     *              color: "red",
     *              fontStyle: "italic",
     *              fontWeight: "bold"
     *          },
     *          numberFormat: "##.###"
     *     })
     * </pre>
     */
    construct: function (settings) {
        settings.gridRendererStyle = settings.gridRendererStyle || {};

        this.base(arguments,
            settings.gridRendererStyle.textAlign || 'right',
            settings.gridRendererStyle.textColor,
            settings.gridRendererStyle.fontStyle,
            settings.gridRendererStyle.fontWeight
        );

        this.setNumberFormat(settings.numberFormat || null);
    }
});
