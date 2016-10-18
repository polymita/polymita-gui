qx.Class.define("polymita.management.AbstractManagement", {
    type: 'abstract',
    extend: qx.ui.container.Composite,

    /**
     * Constructor
     *
     * @param settings {Object} Component settings.
     * @param customData {Object} Extra custom data. Ex { filters: {...} }
     * @param modulePage {polymita.management.Page} Current page where render this component.
     */
    construct: function (settings, customData, modulePage) {
        this.base(arguments);
        this.set({
            layout: new qx.ui.layout.VBox(0),
            decorator: "polymita-management",
            settings: settings,
            customData: customData || {},
            modulePage: modulePage
        });

        this._messagingRouteIds = [];
    },

    events: {
        changeCustomData: 'qx.event.type.Data'
    },

    properties: {
        settings: {
            check: 'Object',
            transform: '_setDefaultPropertiesValues'
        },

        customData: {
            check: 'Object',
            event: 'changeCustomData'
        },

        modulePage: {
            check: 'polymita.management.Page'
        }
    },

    members: {
        _messagingRouteIds: null,

        _setDefaultPropertiesValues: function (settings) {
            var propertiesSettings = this.constructor.properties;

            Object.keys(propertiesSettings).forEach(function (propertyName) {
                if (settings.properties[propertyName] === undefined) {
                    settings.properties[propertyName] = propertiesSettings[propertyName].settings.value
                }
            });

            return settings;
        },

        getI18n: function () {
            return this.getSettings().properties.i18n;
        },

        /**
         * Adds a route handler for the current module channel. The route is called
         * if the {@link #emit} method finds a match.
         *
         * @param msgPatternId {String|RegExp} The pattern, used for checking if the executed path matches.
         * @param handler {Function} The handler to call if the route matches the executed path.
         * @param componentId {Integer?} Id of foraging component that emit message.
         */
        addMessagingListener: function (msgPatternId, handler, componentId) {
            var channel = 'C' + (componentId || this.getSettings().id);
            this._messagingRouteIds.push(q.messaging.on(channel, msgPatternId, handler, this));
        },

        /**
         * Sends a message on the current module channel and informs all matching route handlers.
         *
         * @param msgId {String} Messaging identifier.
         * @param customData {Map?} The given custom data that should be propagated.
         */
        emitMessaging: function (msgId, customData) {
            var channel = 'C' + this.getSettings().id;
            q.messaging.emit(channel, msgId, null, customData);
        }
    },

    destruct: function () {
        this._messagingRouteIds.forEach(function (id) {
            q.messaging.remove(id);
        })
    }

});
