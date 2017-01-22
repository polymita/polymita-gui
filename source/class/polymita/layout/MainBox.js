qx.Class.define("polymita.layout.MainBox", {
    type: "singleton",
    extend: qx.ui.tabview.TabView,

    construct: function () {
        this.base(arguments);

        this._pages = {};

        // Create route handler for messaging channels.
        q.messaging.on("Application", "update-session", this.onUpdateSession, this);
        q.messaging.on("Application", "open-module", this.onOpenModule, this);

        this.addListener('changeSelection', this.onChangeSelection, this);
    },

    members: {
        _pages: null,

        /**
         * Fired after session is login or logout.
         *
         * @param data {Object} Message data with response info from login or logout action.
         */
        onUpdateSession: function (data) {
            // Close all tabs.
            for (var id in this._pages) {
                this._pages[id].fireEvent('close');
            }
        },

        /**
         * Fired emitted 'open-module' message as when done double-click in a node of the tree of modules.
         *
         * @param data {Object} Message data with selected module info.
         */
        onOpenModule: function (data) {
            var module = data.params,
                page = this._pages[module.id];

            if (!page) {
                var request = new polymita.request.Components(true);

                request.findAll('place', { moduleId: module.id }, function (response) {
                    if (response.successful) {
                        if (response.count == 0) {
                            if (!module.children) {
                                q.messaging.emit('Application', 'warn',
                                    polymita.I18n.trans('Modules', 'Messages', 'EMPTY', [
                                        polymita.I18n.trans(module.i18nCatalog, 'Labels', 'MODULE-REFERENCE')
                                    ])
                                );
                            }
                        } else {
                            page = new polymita.management.Page(module, response.data, data.customData || {});
                            page.addListener('close', this.onClosePage, this);

                            this.add(page);
                            this._pages[page.id] = page;
                            this.setSelection([page]);
                        }
                    } else {
                        var msg = polymita.I18n.trans('Common', 'Messages', 'FAILED LOAD');
                        q.messaging.emit('Application', 'error', msg);
                    }
                }, this);

            } else {
                this.setSelection([page]);
                page.setCustomData(data.customData || {});
            }
        },

        /**
         * Fired when closed one tab.
         *
         * @param e {qx.event.type.Event}
         */
        onClosePage: function (e) {
            var page = e.getTarget();
            delete this._pages[page.id];
            qx.event.Timer.once(page.destroy, page, 500);
        },

        onChangeSelection: function (e) {
            q.messaging.emit("Application", "change-active-module", e.getData()[0]);
        }
    }
});
