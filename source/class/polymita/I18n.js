qx.Class.define("polymita.I18n", {
    statics: {
        setup: function () {
            var manager = qx.locale.Manager.getInstance(),
                request = new polymita.request.I18ns(true);

            request.findAll('created_at', { locale: manager.getLocale() }, function (response) {
                if (response.successful) {
                    var translationMap = {};

                    response.data.forEach(function (item) {
                        var i18nId = item.catalog + '.' + item.subCatalog + '.' + item.name;
                        translationMap[i18nId] = item.value;
                    });

                    manager.addTranslation(manager.getLocale(), translationMap);
                } else {
                    var msg = polymita.I18n.trans('Common', 'Messages', 'FAILED LOAD');
                    q.messaging.emit('Application', 'error', msg);
                }
            }, this)
        },

        /**
         * Translate a text subscribed in the i18n catalog.
         *
         * @param catalog {String?'Common'}
         * @param subCatalog {String?'Labels'}
         * @param name {String}
         * @param args {Map?}
         * @return {String}
         */
        trans: function (catalog, subCatalog, name, args) {
            var aux;
            if (arguments.length == 1) {
                aux = catalog.split('.');
                name = aux.pop();
                subCatalog = aux.pop() || 'Labels';
                catalog = aux.pop() || 'Common';
            } else if (arguments.length == 2) {
                args = subCatalog;
                aux = catalog.split('.');
                name = aux.pop();
                subCatalog = aux.pop() || 'Labels';
                catalog = aux.pop() || 'Common';
            }

            var manager = qx.locale.Manager.getInstance(),
                i18nId = catalog + '.' + subCatalog + '.' + name,
                value = manager.translate(i18nId, args || []);

            if (value == i18nId) {
                i18nId = 'Common.' + subCatalog + '.' + name;
                value = manager.translate(i18nId, args || []);
            }

            if (value == i18nId) {
                var manager = qx.locale.Manager.getInstance(),
                    request = new polymita.request.I18ns(),
                    value = '[' + catalog + '.' + subCatalog + '.' + name + ']',
                    tran = {};

                tran[catalog + '.' + subCatalog + '.' + name] = value;
                manager.addTranslation(manager.getLocale(), tran);

                request.create({
                    "name": name,
                    "locale": manager.getLocale(),
                    "catalog": catalog,
                    "subCatalog": subCatalog,
                    "value": value
                }, function (response) {
                    q.messaging.emit('Application', 'info', "Add " + value + " to i18n.");
                });
            }

            return String((value == i18nId) ? '[' + catalog + '.' + subCatalog + '.' + name + ']' : value);
        }

    }
});
