qx.Class.define("polymita.action.Components", {
    extend: polymita.action.AbstractActionWithSelectedItem,

    construct: function (management) {
        this.base(arguments, management, 'components', 'polymita/icon/16/actions/components.png');
    },

    members: {
        onExecute: function () {
            var currentModule = this.getSelectedItem(),
                request = new polymita.request.Modules();

            request.findRange(0, 1, null, { name: 'components' }, function (response) {
                var componentsModule = response.data[0],
                    label = [
                        polymita.I18n.trans(currentModule.i18nCatalog, 'Labels', 'MODULE-REFERENCE'),
                        polymita.I18n.trans(componentsModule.i18nCatalog, 'Labels', 'MODULE-REFERENCE')
                    ];

                q.messaging.emit("Application", "open-module", componentsModule, {
                    label: label,
                    filters: { moduleId: currentModule.id },
                    mainModule: currentModule
                });
            }, this);
        }
    }
});
