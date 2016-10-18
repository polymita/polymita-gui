/**
 * @ignore(Map)
 */
qx.Class.define("polymita.table.cellrenderer.Request", {
    type: 'abstract',
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
        this.constructor.items = this.constructor.items || new Map();

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
            if (cellInfo.value === null) {
                return '-';
            }

            var id = cellInfo.value,
                items = this.constructor.items;

            if (!items.has(id)) {
                var request = this.getRequest();
                request.find(id, function (response) {
                    items.set(id, this.getText(response.data))
                }, this);
            }

            return items.get(id);
        },

        /**
         * @abstract
         * @return {polymita.request.AbstractResource}
         */
        getRequest: function () {
            throw new Error("Abstract method call.");
        },

        /**
         * Returns text to be show in grid cell.
         *
         * @param data {Object} Response data.
         * @returns {string}
         */
        getText: function (data) {
            return data.label || data.title || data.name;
        }
    }
});
