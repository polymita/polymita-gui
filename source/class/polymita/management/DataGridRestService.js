/**
 * @asset(qx/icon/${qx.icontheme}/16/actions/media-seek-forward.png)
 */
qx.Class.define("polymita.management.DataGridRestService", {
    extend: polymita.management.AbstractManagement,

    statics: {
        allowActions: true,
        allowFields: true,
        properties: {
            i18n: {
                type: polymita.form.field.TextField,
                settings: { required: true, pattern: '[A-Za-z0-9_-]+', maxLength: 30, value: 'Common' }
            },
            restServiceURL: {
                type: polymita.form.field.TextField,
                settings: { required: true, maxLength: 255, value: '/restServiceUrl' }
            },
            formWidth: {
                type: polymita.form.field.IntegerField,
                settings: { required: true, minimum: 50, value: 500 }
            },
            formHeight: {
                type: polymita.form.field.IntegerField,
                settings: { required: true, minimum: 30, value: 300 }
            },
            edge: {
                type: polymita.form.field.util.EdgeSelectBox,
                settings: { value: 'center' }
            },
            region: {
                type: polymita.form.field.IntegerField,
                settings: { required: true, minimum: 0, value: 100 }
            },
            rowHeight: {
                type: polymita.form.field.IntegerField,
                settings: { required: true, minimum: 20, value: 28 }
            },
            blockSize: {
                type: polymita.form.field.IntegerField,
                settings: { required: true, minimum: 5, value: 40 }
            },
            maxCachedBlockCount: {
                type: polymita.form.field.IntegerField,
                settings: { required: true, minimum: 2, value: 5 }
            },
            primarySelectionComponentId: {
                type: polymita.form.field.IntegerField,
                settings: { required: false, minimum: 1, value: null }
            },
            primaryFieldName: {
                type: polymita.form.field.TextField,
                settings: { required: false, pattern: '[a-z]+([A-Z][a-z]+)*', filterIn: '[a-zA-Z]', value: 'id' }
            },
            localFieldName: {
                type: polymita.form.field.TextField,
                settings: { required: false, pattern: '[a-z]+([A-Z][a-z]+)*', filterIn: '[a-zA-Z]', value: null }
            },
            baseParams: {
                type: polymita.form.field.TextField,
                settings: { required: false, value: '{}' }
            }
        }
    },

    // override
    construct: function (settings, customData, modulePage) {
        this.base(arguments, settings, customData, modulePage);

        this.__menuItemStore = {};

        this._createToolbar();
        this._createTable(customData);

        this.addMessagingListener("execute-reload", this.onExecuteReload);
        this.addMessagingListener("execute-add", this.onExecuteAdd);
        this.addMessagingListener("execute-update", this.onExecuteUpdate);
        this.addMessagingListener("execute-remove", this.onExecuteRemove);
        this.addMessagingListener("execute-search", this.onExecuteSearch);
        this.addMessagingListener("execute-global-search", this.onExecuteGlobalSearch);
        this.addMessagingListener('selection-change',
            this.onSelectionChange,
            settings.properties.primarySelectionComponentId
        );

        this.addListener("changeCustomData", this.onChangeCustomData);
    },

    members: {
        _createToolbar: function () {
            var request = new polymita.request.Actions(true),
                settings = this.getSettings();

            request.findAll('place', { componentId: settings.id }, function (response) {
                if (response.successful) {
                    var actions = response.data;

                    if (actions.length) {
                        var toolbar = new qx.ui.toolbar.ToolBar();

                        toolbar.setSpacing(5);
                        toolbar.setMinHeight(35);
                        toolbar.setMaxHeight(35);
                        toolbar.setOverflowHandling(true);
                        toolbar.addSeparator();

                        this.add(toolbar, { flex: 1 });

                        actions.forEach(function (setting) {
                            var widgetClass = qx.Class.getByName(setting.widgetClass),
                                action;

                            if (widgetClass) {
                                action = new widgetClass(this);
                                toolbar.add(action);
                            } else {
                                q.messaging.emit("Application", "error", this.tr("Class no found: '%1'.", setting.widgetClass));
                            }
                        }, this);

                        // Add overflow indicator.
                        var chevron = new qx.ui.form.MenuButton(null, "icon/16/actions/media-seek-forward.png"),
                            overflowMenu = this.__overflowMenu = new qx.ui.menu.Menu();

                        chevron.setAppearance("button");
                        chevron.setMenu(overflowMenu);
                        chevron.setAlignX('right');
                        toolbar.add(chevron);
                        toolbar.setOverflowIndicator(chevron);

                        // add the listener
                        toolbar.addListener("hideItem", this._onHideItem, this);
                        toolbar.addListener("showItem", this._onShowItem, this);
                    }
                } else {
                    var msg = polymita.I18n.trans('Common', 'Messages', 'FAILED LOAD');
                    q.messaging.emit('Application', 'error', msg);
                }
            }, this);
        },

        /**
         * Handler for the overflow handling which will be called on hide.
         * @param e {qx.event.type.Data} The event.
         */
        _onHideItem: function (e) {
            var partItem = e.getData();
            var menuItems = this._getMenuItems(partItem);
            for (var i = 0, l = menuItems.length; i < l; i++) {
                menuItems[i].setVisibility("visible");
            }
        },

        /**
         * Handler for the overflow handling which will be called on show.
         * @param e {qx.event.type.Data} The event.
         */
        _onShowItem: function (e) {
            var partItem = e.getData();
            var menuItems = this._getMenuItems(partItem);
            for (var i = 0, l = menuItems.length; i < l; i++) {
                menuItems[i].setVisibility("excluded");
            }
        },

        /**
         * Helper for the overflow handling. It is responsible for returning a
         * corresponding menu item for the given toolbar item.
         *
         * @param toolbarItem {qx.ui.core.Widget} The toolbar item to look for.
         * @return {qx.ui.core.Widget} The coresponding menu items.
         */
        _getMenuItems: function (partItem) {
            var cachedItems = [],
                cachedItem = this.__menuItemStore[partItem.toHashCode()];

            if (!cachedItem) {
                if (partItem instanceof qx.ui.toolbar.MenuButton) {
                    cachedItem = new qx.ui.menu.Button(
                        partItem.getLabel(),
                        partItem.getIcon(),
                        partItem.getCommand(),
                        partItem.getMenu()
                    );
                    cachedItem.setToolTipText(partItem.getToolTipText());
                    cachedItem.setEnabled(partItem.getEnabled());
                    partItem.bind("enabled", cachedItem, "enabled");
                } else if (partItem instanceof qx.ui.toolbar.Button) {
                    cachedItem = new qx.ui.menu.Button(
                        partItem.getLabel(),
                        partItem.getIcon()
                    );
                    cachedItem.getChildControl('label', false).setRich(true);
                    cachedItem.setTextColor(partItem.getTextColor());
                    cachedItem.setToolTipText(partItem.getToolTipText());
                    cachedItem.setEnabled(partItem.getEnabled());
                    partItem.bind("enabled", cachedItem, "enabled");
                    var listeners = qx.event.Registration.getManager(partItem).getListeners(partItem, 'execute');
                    if (listeners && listeners.length > 0) {
                        for (var j = 0, k = listeners.length; j < k; j++) {
                            cachedItem.addListener('execute', qx.lang.Function.bind(listeners[j].handler, listeners[j].context));
                        }
                    }
                } else if (partItem instanceof qx.ui.toolbar.CheckBox) {
                    cachedItem = new qx.ui.menu.CheckBox(
                        partItem.getLabel()
                    );
                    cachedItem.setToolTipText(partItem.getToolTipText());
                    cachedItem.setEnabled(partItem.getEnabled());
                    partItem.bind("enabled", cachedItem, "enabled");
                } else if (partItem instanceof qx.ui.form.Button) {
                    cachedItem = new qx.ui.menu.Button(
                        partItem.getLabel(),
                        partItem.getIcon(),
                        partItem.getCommand()
                    );
                    cachedItem.setToolTipText(partItem.getToolTipText());
                    cachedItem.setEnabled(partItem.getEnabled());
                    partItem.bind("enabled", cachedItem, "enabled");
                } else {
                    cachedItem = new qx.ui.menu.Separator();
                }

                this.__menuItemStore[partItem.toHashCode()] = cachedItem;
                this.__overflowMenu.add(cachedItem)
            }

            cachedItems.push(cachedItem);

            return cachedItems;
        },

        _createTable: function (customData) {
            var request = new polymita.request.Fields(true),
                settings = this.getSettings();

            request.findAll('place', { componentId: settings.id }, function (response) {
                if (response.successful) {
                    var fields = response.data,
                        columnFields = fields.filter(function (f) {
                            return f.showInGrid
                        }),
                        localFieldName = settings.properties.localFieldName,
                        baseParams = qx.lang.Json.parse(settings.properties.baseParams),
                        filters = qx.lang.Object.mergeWith(baseParams, customData.filters || {});

                    if (localFieldName && filters[localFieldName] === undefined) {
                        filters[localFieldName] = -1;
                    }

                    var tableModel = new polymita.model.DataGridRestService(columnFields, settings, filters),
                        table = this._table = new qx.ui.table.Table(tableModel, {
                            tableColumnModel: function (table) {
                                return new qx.ui.table.columnmodel.Resize(table);
                            }
                        }),
                        tableColumnModel = table.getTableColumnModel(),
                        cellRendererClass, widgetClass;

                    settings.properties.fields = fields;
                    table.set({
                        rowHeight: settings.properties.rowHeight || 28,
                        showCellFocusIndicator: false,
                        decorator: 'polymita-data-grid',
                        columnVisibilityButtonVisible: true
                    });

                    columnFields.forEach(function (field, index) {
                        field.properties = qx.lang.Json.parse(field.properties);

                        if (field.properties.gridColumnWidth) {
                            var width = String(field.properties.gridColumnWidth);

                            width = width.match(/^\d+%$/) ? width : parseInt(width);

                            if (width !== '' && width !== 0 && width !== '0%') {
                                tableColumnModel.getBehavior().setWidth(index, width);
                            }
                        } else {
                            tableColumnModel.getBehavior().setMinWidth(index, 40);
                        }

                        widgetClass = qx.Class.getByName(field.widgetClass);
                        cellRendererClass = widgetClass
                            ? widgetClass.cellRendererType
                            : polymita.table.cellrenderer.String;

                        tableColumnModel.setDataCellRenderer(index,
                            new cellRendererClass(field.properties)
                        );
                    }, this);

                    this.add(table, { flex: 2 });
                    table.getSelectionModel().addListener("changeSelection", this.onChangeSelection, this);
                } else {
                    var msg = polymita.I18n.trans('Common', 'Messages', 'FAILED LOAD');
                    q.messaging.emit('Application', 'error', msg);
                }
            }, this);
        },

        onChangeCustomData: function (e) {
            var data = e.getData();
            if (data.filters) {
                this._table.getSelectionModel().resetSelection();
                this._table.getTableModel().setFilters(data.filters);
            }
        },

        onExecuteReload: function () {
            this._table.getSelectionModel().resetSelection();
            this._table.getTableModel().reloadData();
        },

        onExecuteAdd: function (data) {
            var dlg = data.params.dlg,
                record = data.customData,
                properties = this.getSettings().properties,
                request = new polymita.request.Customs(properties.restServiceURL);

            qx.lang.Object.mergeWith(record, this.getCustomData().filters);

            request.create(record, function (response) {
                var msg, i18nCatalog = properties.i18n;

                if (response.successful) {
                    msg = polymita.I18n.trans(i18nCatalog, 'Messages', 'SUCCESSFUL-ADDING');
                    q.messaging.emit('Application', 'good', msg);
                    this.emitMessaging('execute-reload');
                    dlg.close();
                } else {
                    msg = polymita.I18n.trans(i18nCatalog, 'Messages', 'FAILED-ADDING');
                    q.messaging.emit('Application', 'error', msg);
                }
            }, this);
        },

        onExecuteUpdate: function (data) {
            var dlg = data.params.dlg,
                record = data.customData,
                properties = this.getSettings().properties,
                request = new polymita.request.Customs(properties.restServiceURL);

            request.update(record.id, record, function (response) {
                var msg, i18nCatalog = properties.i18n;

                if (response.successful) {
                    msg = polymita.I18n.trans(i18nCatalog, 'Messages', 'SUCCESSFUL-UPDATING');
                    q.messaging.emit('Application', 'good', msg);
                    this.emitMessaging('execute-reload');
                    dlg.close();
                } else {
                    msg = polymita.I18n.trans(i18nCatalog, 'Messages', 'FAILED-UPDATING');
                    q.messaging.emit('Application', 'error', msg);
                }
            }, this);
        },

        onExecuteRemove: function (data) {
            this._table.getSelectionModel().resetSelection();
            this._table.getTableModel().removeRow(data.customData.index);
        },

        onExecuteSearch: function (data) {
            // Save original customData before apply first search.
            this._customData = this._customData || qx.lang.Object.clone(this.getCustomData(), true);

            var dlg = data.params.dlg,
                customData = qx.lang.Object.clone(this._customData, true),
                baseParams = qx.lang.Json.parse(this.getSettings().properties.baseParams),
                searchData = data.customData;

            // Merge filters with searchData and baseParams.
            customData.filters = customData.filters || {};
            qx.lang.Object.mergeWith(customData.filters, searchData);
            qx.lang.Object.mergeWith(customData.filters, baseParams);

            dlg.close();
            this.setCustomData(customData);
        },

        onExecuteGlobalSearch: function (data) {
            var globalSearchText = this.getModulePage().getGlobalSearchText();

            if (globalSearchText != data.customData) {
                var customData = qx.lang.Object.clone(this.getCustomData(), true),
                    baseParams = qx.lang.Json.parse(this.getSettings().properties.baseParams);

                // Merge filters with searchData and baseParams.
                customData.filters = customData.filters || {};
                customData.filters._quick_search_ = data.customData;
                qx.lang.Object.mergeWith(customData.filters, baseParams);

                this.getModulePage().setGlobalSearchText(data.customData);
                this.setCustomData(customData);
            }
        },

        /**
         * Fired when the selection has changed.
         *
         * @param e {qx.event.type.Event}
         */
        onChangeSelection: function (e) {
            var selectionModel = e.getTarget(),
                tableModel = this._table.getTableModel(),
                index, data;

            if (selectionModel.getSelectedCount()) {
                index = selectionModel.getSelectedRanges()[0].minIndex;
                data = { index: index, item: tableModel.getRowData(index), sender: this };
            } else {
                data = null
            }
            // Send message to accions
            this.emitMessaging("selection-change", data);
        },

        /**
         * Fired when emitted 'changed-selection' in any component of current modules.
         *
         * @param data {Object} Selected item data.
         */
        onSelectionChange: function (data) {
            if (data.customData) {
                var sender = data.customData.sender,
                    properties = this.getSettings().properties,
                    primarySelectionComponentId = properties.primarySelectionComponentId,
                    primaryFieldName = properties.primaryFieldName || 'id',
                    localFieldName = properties.localFieldName || 'id';

                if (sender && sender != this && sender.getSettings().id == primarySelectionComponentId) {
                    var customData = qx.lang.Object.clone(this.getCustomData(), true);

                    customData.filters = qx.lang.Object.mergeWith(
                        customData.filters || {},
                        qx.lang.Json.parse(properties.baseParams)
                    );

                    customData.filters[localFieldName] = data.customData.item[primaryFieldName];

                    this.setCustomData(customData);
                }
            }
        }
    }
});
