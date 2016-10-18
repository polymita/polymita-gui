/**
 * @ignore(Map)
 */
qx.Class.define("polymita.model.DataGridRestService", {
    extend: qx.ui.table.model.Remote,
    include: [qx.locale.MTranslation],

    construct: function (fields, settings, filters) {
        this.base(arguments);
        this.setBlockSize(settings.properties.blockSize || 20);
        this.setMaxCachedBlockCount(settings.properties.maxCachedBlockCount || 5);
        this.setFilters(filters);
        this.__widgetsClass = new Map();

        var i18nCatalog = settings.properties.i18n,
            columnNames = [],
            columnIDs = [];

        fields.forEach(function (field) {
            if (field.showInGrid) {
                columnNames.push(polymita.I18n.trans(i18nCatalog, 'Labels', field.name));
                columnIDs.push(field.name);
                this.__widgetsClass.set(field.name, field.widgetClass);
            }
        }, this);

        this.setColumns(columnNames, columnIDs);
        this._restServiceURL = settings.properties.restServiceURL;
        this.addListener('changeFilter', this.reloadData, this);
    },

    properties: {
        filters: {
            check: 'Object',
            init: {},
            event: 'changeFilter'
        }
    },

    members: {
        _restServiceURL: null,

        _loadRowCount: function () {
            var request = new polymita.request.Customs(this._restServiceURL);

            request.count(this.getFilters(), function (response) {
                if (response.successful) {
                    this._onRowCountLoaded(response.count);
                }
            }, this);

            this._onRowCountLoaded(0);
        },

        _loadRowData: function (pFrom, pTo) {
            var request = new polymita.request.Customs(this._restServiceURL);

            request.findRange(pFrom, pTo, this.getOrder(), this.getFilters(), function (response) {
                if (response.successful) {

                    response.data.forEach(function (record, index) {
                        Object.keys(record).forEach(function(field){
                            record[field] = this.parseValue(field, record[field]);
                        }, this);
                    }, this);

                    this._onRowDataLoaded(response.data);
                }
            }, this);
        },

        getOrder: function () {
            var sortField = this.getColumnId(this.getSortColumnIndex()),
                sortOrder = this.isSortAscending() ? " asc" : " desc";

            return sortField ? sortField + sortOrder : null;
        },

        parseValue: function (fieldName, fieldValue) {
            var widgetClass = qx.Class.getByName(this.__widgetsClass.get(fieldName));

            if (widgetClass && widgetClass.parseValue) {
                return widgetClass.parseValue(fieldValue);
            }

            return fieldValue;
        }
    }
});
