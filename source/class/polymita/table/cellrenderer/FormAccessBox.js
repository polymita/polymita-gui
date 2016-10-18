qx.Class.define("polymita.table.cellrenderer.FormAccessBox", {
    extend: qx.ui.table.cellrenderer.String,

    /**
     * Constructor
     *
     * @param settings {Map} Settings to apply to the cell renderer.
     * <pre class='javascript'>
     *     new polymita.table.cellrenderer.FormAccessBox({
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
        // overridden
        _getContentHtml: function (cellInfo) {
            var items = {
                N: 'NONE',
                H: 'HIDDEN',
                R: 'READ',
                W: 'WRITE'
            };

            return polymita.I18n.trans('Forms', 'Access', items[cellInfo.value || 'N']);
        }

    }
});
