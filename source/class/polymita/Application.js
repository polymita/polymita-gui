/* ************************************************************************

 Copyright:

 License:

 Authors:

 ************************************************************************ */

/**
 * This is the main application class of your custom application "polymita-gui"
 *
 * @asset(polymita/*)
 * @require(qx.module.Messaging)
 * @require(polymita.dialog.Waiting)
 */
qx.Class.define("polymita.Application", {
    extend: qx.application.Standalone,
    include: [polymita.mixin.MComponents, polymita.mixin.MProperties],

    construct: function () {
        this.base(arguments);

        qx.util.LibraryManager.getInstance().set('polymita', "resourceUri", '.');
        qx.util.LibraryManager.getInstance().set('qx', "resourceUri", '.');

        this.loadProperties(polymita.Application);
    },

    members: {
        __toolTipTemplate: "<span title='{{localization}}'>{{description}}</span>",
        __managementComponents: new qx.data.Array,
        __formFieldComponents: new qx.data.Array,
        __formFieldValidators: new qx.data.Array,
        __actionComponents: new qx.data.Array,

        /**
         * This method contains the initial application code and gets called
         * during startup of the application
         *
         * @lint ignoreDeprecated(alert)
         */
        main: function () {
            // Call super class
            this.base(arguments);

            // Enable logging in debug variant
            if (qx.core.Environment.get("qx.debug")) {
                // support native logging capabilities, e.g. Firebug for Firefox
                qx.log.appender.Native;
                // support additional cross-browser console. Press F7 to toggle visibility
                qx.log.appender.Console;
            }

            this.registerComponents();
            polymita.I18n.setup();

            if (polymita.request.Session.getInstance().isAuthenticated()) {
                var root = this.getRoot();

                root.setBlockerOpacity(0.6);
                root.setBlockerColor("black");

                // Create main layout
                var dockLayout = new qx.ui.layout.Dock();
                var dockLayoutComposite = new qx.ui.container.Composite(dockLayout);
                dockLayout.setSort("y");
                root.add(dockLayoutComposite, { edge: 0 });

                this.__doLayouts(dockLayoutComposite);
            } else {
                polymita.request.Session.getInstance().login();
            }

            // Create route handler for messaging channels.
            q.messaging.on("Application", "info", this.onTipInformation, this);
            q.messaging.on("Application", "good", this.onTipGood, this);
            q.messaging.on("Application", "warn", this.onTipWarning, this);
            q.messaging.on("Application", "error", this.onTipError, this);
            q.messaging.on("Application", "update-session", this.onUpdateSession, this);
        },

        /**
         * Crate layouts
         *
         * @param dockLayoutComposite {qx.ui.container.Composite}
         * @private
         */
        __doLayouts: function (dockLayoutComposite) {
            // Create header
            this.__headerBox = polymita.layout.Header.getInstance();
            dockLayoutComposite.add(this.__headerBox, { edge: "north" });


            // Create horizontal splitpane for left, main and right boxs
            var mainBoxWidth = qx.bom.Viewport.getWidth(),
                leftSplitPane = new qx.ui.splitpane.Pane();
            dockLayoutComposite.add(leftSplitPane, { edge: "center" });

            // Create left box
            this.__leftBox = polymita.layout.LeftBox.getInstance();
            leftSplitPane.add(this.__leftBox, 0);
            mainBoxWidth -= this.__leftBox.getWidth();

            // Create main box
            this.__mainBox = polymita.layout.MainBox.getInstance();
            leftSplitPane.add(this.__mainBox, 1);

            this.__mainBox.setWidth(mainBoxWidth);

            // Create footer box
            this.__footerBox = polymita.layout.Footer.getInstance();
            dockLayoutComposite.add(this.__footerBox, { edge: "south" });
        },

        /**
         * Returns names of given classes.
         *
         * @param componentClasses {Array|Class|String}
         * @return {Array}
         * @internal
         */
        __classesToStrings: function (componentClasses) {
            componentClasses = qx.lang.Type.isArray(componentClasses) ? componentClasses : [componentClasses];
            return componentClasses.map(function (c) {
                return qx.lang.Type.isString(c) ? c : c.classname
            })
        },

        registerActionComponents: function (componentClasses) {
            componentClasses && this.__actionComponents.append(this.__classesToStrings(componentClasses));
            return this.__actionComponents;
        },

        registerFormFieldComponents: function (componentClasses) {
            componentClasses && this.__formFieldComponents.append(this.__classesToStrings(componentClasses));
            return this.__formFieldComponents;
        },

        registerFormFieldValidators: function (componentClasses) {
            componentClasses && this.__formFieldValidators.append(this.__classesToStrings(componentClasses));
            return this.__formFieldValidators;
        },

        registerManagementComponents: function (componentClasses) {
            componentClasses && this.__managementComponents.append(this.__classesToStrings(componentClasses));
            return this.__managementComponents;
        },

        getToolTioPlaceToWidget: function () {
            return this.__headerBox || this.__mainBox || this.getRoot();
        },

        onTipInformation: function (data) {
            var msg = qx.lang.Type.isString(data.params) ? data.params : qx.bom.Template.render(this.__toolTipTemplate, data.params);
            polymita.ToolTip.info(msg);
        },

        onTipGood: function (data) {
            var msg = qx.lang.Type.isString(data.params) ? data.params : qx.bom.Template.render(this.__toolTipTemplate, data.params);
            polymita.ToolTip.good(msg);
        },

        onTipWarning: function (data) {
            var msg = qx.lang.Type.isString(data.params) ? data.params : qx.bom.Template.render(this.__toolTipTemplate, data.params);
            polymita.ToolTip.warn(msg);
        },


        onTipError: function (data) {
            var msg = qx.lang.Type.isString(data.params) ? data.params : qx.bom.Template.render(this.__toolTipTemplate, data.params);
            polymita.ToolTip.error(msg);
        },

        /**
         * Execute when user login or logout.
         * Open login dialog when user is logout.
         *
         * @param data {Map} Login or logout data.
         */
        onUpdateSession: function (data) {
            window.location = window.location.origin;
        }
    }
});
