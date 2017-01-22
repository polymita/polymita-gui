qx.Class.define("polymita.action.Actions", {
    extend: polymita.action.AbstractActionWithSelectedItem,

    construct: function (management) {
        this.base(arguments, management, 'actions', 'polymita/icon/16/actions/actions.png');
    },

    members: {
        onExecute: function () {
            var currentModule = this.getSelectedItem(),
                request = new polymita.request.Modules();

            request.findRange(0, 1, null, { name: 'actions' }, function (response) {
                var actionsModule = response.data[0],
                    mainModule = this.getManagement().getCustomData().mainModule,
                    label = [
                        polymita.I18n.trans(mainModule.i18nCatalog, 'Labels', 'MODULE-REFERENCE'),
                        polymita.I18n.trans('Modules', 'Labels', 'component') + '-' + currentModule.id,
                        polymita.I18n.trans(actionsModule.i18nCatalog, 'Labels', 'MODULE-REFERENCE')
                    ];

                q.messaging.emit("Application", "open-module", actionsModule, {
                    label: label,
                    filters: { componentId: currentModule.id },
                    mainModule: mainModule
                });
            }, this);
        },

        // override
        onSelectionChange: function (data) {
            this.base(arguments, data);

            if (this.isEnabled()) {
                var widgetClass = this.getSelectedItem().widgetClass;
                widgetClass = qx.Class.getByName(widgetClass);
                this.setEnabled(widgetClass !== undefined && widgetClass.allowActions === true);
            }
        }

    }
});
