/**
 *
 * @childControl title {qx.ui.basic.Atom} Title component properties panel.
 * @childControl form-panel {qx.ui.container.Scroll} Scroll component properties panel.
 */
qx.Class.define("polymita.management.Properties", {
    extend: polymita.management.AbstractManagement,

    statics: {
        properties: {
            i18n: {
                type: polymita.form.field.TextField,
                settings: { required: true, pattern: '[A-Za-z0-9_-]+', maxLength: 30, value: '' }
            },

            restServiceURL: {
                type: polymita.form.field.TextField,
                settings: { required: true, maxLength: 100, value: '/restServiceURL' }
            },

            edge: {
                type: polymita.form.field.util.EdgeSelectBox,
                settings: {}
            },

            region: {
                type: polymita.form.field.IntegerField,
                settings: { required: true, minimum: 0, value: 30 }
            },

            primarySelectionComponentId: {
                type: polymita.form.field.IntegerField,
                settings: { required: true, minimum: 1, value: 3 }
            }
        }
    },

    construct: function (settings, customData, modulePage) {
        this.base(arguments, settings, customData, modulePage);
        this.setAppearance('properties');
        this.setRestServiceURL(settings.properties.restServiceURL);
        this._createChildControl("title");
        this._createChildControl("form-panel");
        this.addMessagingListener('selection-change',
            this.onSelectionChange,
            settings.properties.primarySelectionComponentId
        );

        this.__saveTimer = new qx.event.Timer(50);
        this.__saveTimer.addListener('interval', this.onSetPropertiesValues, this);
        this.addListener('focusout', this.__saveTimer.restart, this.__saveTimer);
        this.addListener('focusin', this.__saveTimer.stop, this.__saveTimer);
    },

    properties: {
        selectedItem: {
            nullable: true
        },

        selectedIndex: {
            nullable: true
        },

        restServiceURL: {
            check: 'String',
            init: '/restServiceURL'
        },

        focusable: {
            refine: true,
            init: true
        }
    },

    members: {
        // overridden
        _createChildControlImpl: function (id, hash) {
            var control;

            switch (id) {
                case "title":
                    control = new qx.ui.basic.Atom(polymita.I18n.trans('Properties.Labels.properties'));
                    control.setMaxHeight(27);
                    this._add(control, { flex: 2 });
                    break;

                case "form-panel":
                    var control = new qx.ui.container.Scroll(),
                        form = this.__form = new qx.ui.form.Form(),
                        renderer = new qx.ui.form.renderer.Single(form);

                    renderer.setPadding(5);
                    renderer.getLayout().setColumnFlex(0, 0);
                    renderer.getLayout().setColumnFlex(1, 1);

                    control.add(renderer);

                    this._add(control, { flex: 3 });
                    break;
            }

            return control || this.base(arguments, id);
        },

        /**
         * Remove all field from properties panel.
         */
        __cleanForm: function () {
            // Remove all items of the form.
            var items = this.__form.getItems();

            Object.keys(items).forEach(function (name) {
                this.__form.remove(items[name]);
            }, this);
        },

        /**
         * Add properties field of selected item into properties panel.
         */
        __createPropertiesField: function () {
            var properties = this.getPropertiesSettings();

            if (properties) {
                // Create and add items into form.
                var values = this.getPropertiesValues(),
                    controller = new qx.data.controller.Form(null, this.__form),
                    catalog = this.getCustomData().mainModule.i18nCatalog;

                this.__cleanForm();

                Object.keys(properties).forEach(function (name) {
                    var widgetClass = this.getWidgetClass(properties[name].type) || polymita.form.field.TextField,
                        validator = widgetClass.validatorClass ? new widgetClass.validatorClass : null,
                        field = new widgetClass(),
                        label = polymita.I18n.trans(catalog, 'property', name, false) ||
                            polymita.I18n.trans('Properties', 'Labels', name, false) ||
                            polymita.I18n.trans(catalog, 'property', name, true);

                    // Set field properties.
                    field.setFromJSON(properties[name].settings);
                    field.setMinWidth(80);
                    field.setAllowGrowY(false);

                    this.__form.add(field, label, validator, name, this.__form);
                }, this);

                this.initializeItems();

                this.__model = controller.createModel();

                Object.keys(properties).forEach(function (name) {
                    var value = values[name] !== undefined ? values[name] : properties[name].settings.value;
                    if (value !== undefined) this.__model.set(name, value);
                }, this);

                this.__form.redefineResetter();
            } else {
                this.__cleanForm();
            }
        },

        initializeItems: function () {
            var name, items = this.__form.getItems();

            for (name in items) {
                items[name].initialize && items[name].initialize();
            }
        },

        /**
         * Return widget class for selected item.
         *
         * @return {Class|null}
         */
        getSelectedItemClass: function () {
            var item = this.getSelectedItem();

            return item ? this.getWidgetClass(item.widgetClass) : null;
        },

        /**
         * Returns widget class with given name.
         * Emit error 'Class no found' if it don't exists.
         *
         * @param widgetClass {String}
         * @return {Class|null}
         */
        getWidgetClass: function (widgetClass) {
            if (qx.lang.Type.isString(widgetClass)) {
                widgetClass = qx.Class.getByName(widgetClass);

                if (!widgetClass) {
                    q.messaging.emit("Application", "error", this.tr("Class no found: '%1'.", widgetClass));
                }
            }

            return widgetClass;
        },

        /**
         * Returns properties values for selected item.
         *
         * @return {Object}
         */
        getPropertiesValues: function () {
            var item = this.getSelectedItem();

            return item ? qx.lang.Json.parse(item.properties) : null
        },

        /**
         * Returns properties settings of widget class for selected item.
         *
         * @return {Object}
         */
        getPropertiesSettings: function () {
            var widgetClass = this.getSelectedItemClass();

            return widgetClass ? widgetClass.properties : null
        },

        /**
         * Fired when clicked save action on properties panel.
         * Send properties values to server application.
         */
        onSetPropertiesValues: function () {
            this.__saveTimer.stop();
            if (this.__form.validate()) {
                var item = this.getSelectedItem();

                if (item) {
                    var request = new polymita.request.Customs(this.getRestServiceURL()),
                        data = qx.util.Serializer.toNativeObject(this.__model);

                    item.properties = qx.lang.Json.stringify(data);

                    request.update(item.id, { properties: item.properties }, function (response) {
                        var msg, i18nCatalog = this.getSettings().properties.i18nCatalog

                        if (response.successful) {
                            msg = polymita.I18n.trans(i18nCatalog, 'Messages', 'SUCCESSFUL-ADD');
                            q.messaging.emit('Application', 'good', msg);
                        } else {
                            msg = polymita.I18n.trans(i18nCatalog, 'Messages', 'FAILED-ADD');
                            q.messaging.emit('Application', 'error', msg);
                        }
                    }, this);
                }
            }
        },

        /**
         * Fired when changed selection of component items.
         *
         * @param data {Object} Selected item data.
         */
        onSelectionChange: function (data) {
            this.set((data.customData == null)
                ? { selectedItem: null, selectedIndex: null }
                : { selectedItem: data.customData.item, selectedIndex: data.customData.index }
            );
            this.__saveTimer.restart();
            this.__saveTimer.stop();
            this.__createPropertiesField();
        }
    },

    destruct: function () {
        this.__saveTimer.dispose();
    }
});