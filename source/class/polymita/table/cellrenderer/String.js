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
        this.setI18nSetting(settings.i18n || {});
        this.base(arguments,
            settings.gridRendererStyle.textAlign || 'left',
            settings.gridRendererStyle.textColor,
            settings.gridRendererStyle.fontStyle,
            settings.gridRendererStyle.fontWeight
        );
    },

    properties: {
        i18nSetting: {
            check: 'Object'
        }
    },


    members: {
        _getContentHtml: function (cellInfo) {
            var result = String(cellInfo.value || ""),
                i18n = this.getI18nSetting();

            if (cellInfo.rowData && i18n.active) {
                i18n.catalog = i18n.catalog || 'Common';
                i18n.subCatalog = i18n.subCatalog || 'Labels';
                i18n.name = i18n.name || cellInfo.value;

                var catalog = qx.bom.Template.render(i18n.catalog, cellInfo.rowData),
                    subCatalog = qx.bom.Template.render(i18n.subCatalog, cellInfo.rowData),
                    name = qx.bom.Template.render(i18n.name, cellInfo.rowData);

                result = polymita.I18n.trans(
                    qx.bom.String.unescape(catalog),
                    qx.bom.String.unescape(subCatalog),
                    qx.bom.String.unescape(name)
                );
            }

            return qx.bom.String.escape(result);
        }
    }
});


qx.Class.define("polymita.table.cellrenderer.I18nTextField", {
    extend: polymita.table.cellrenderer.String,

    construct: function (settings) {
        this.base(arguments, settings);
    },


    members: {
        _getContentHtml: function (cellInfo) {

        }
    }
});
