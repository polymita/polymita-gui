qx.Class.define("polymita.management.Page", {
    extend: qx.ui.tabview.Page,

    construct: function (module, components, customData) {
        var label, layoutClass = new qx.ui.layout.Dock(5);

        layoutClass.setSeparatorX("separator-horizontal");
        layoutClass.setSeparatorY("separator-vertical");

        if (customData.label) {
            label = qx.lang.Type.isArray(customData.label) ? customData.label.join(' / ') : customData.label;
        } else {
            label = polymita.I18n.trans(module.i18nCatalog, 'Labels', 'MODULE-REFERENCE');
        }

        this.base(arguments, label);
        this.id = module.id;
        this.set({
            showCloseButton: true,
            layout: layoutClass,
            allowGrowX: true,
            module: module
        });

        components.forEach(function (componentSettings, index) {
            componentSettings.properties = qx.lang.Type.isString(componentSettings.properties)
                ? JSON.parse(componentSettings.properties)
                : componentSettings.properties;

            var componentClass = qx.Class.getByName(componentSettings.widgetClass);

            if (componentClass) {
                var component = new componentClass(componentSettings, customData, this),
                    width = componentSettings.properties.region || componentClass.properties.region.settings.value,
                    edge = componentSettings.properties.edge || componentClass.properties.edge.settings.value;

                this.add(component, { edge: edge, width: width + '%' });
            } else {
                q.messaging.emit("Application", "error",
                    this.tr("Class no found: '%1'.", componentSettings.widgetClass)
                );
            }
        }, this);
    },

    properties: {
        globalSearchText: {
            check: 'String',
            init: ''
        },

        module: {
            check: 'Object'
        }
    },

    members: {
        setCustomData: function (customData) {
            if (customData.label) {
                this.setLabel(qx.lang.Type.isArray(customData.label) ? customData.label.join(' / ') : customData.label);
            }

            this.getChildren().forEach(function (child) {
                child.setCustomData && child.setCustomData(customData);
            }, this);
        }
    }
});
