qx.Class.define("polymita.form.dialog.GridI18n", {
    extend: polymita.form.dialog.AbstractField,

    // override
    construct: function () {
        this.base(arguments, polymita.I18n.trans('Properties', 'Titles', 'i18n') + ':');
    },

    members: {
        _createFormFields: function (form) {
            this.base(arguments);

            var active = new polymita.form.field.boolean.CheckBox,
                catalog = new polymita.form.field.TextField,
                subCatalog = new polymita.form.field.TextField,
                name = new polymita.form.field.TextField,
                placeholder = polymita.I18n.trans('I18ns', 'Labels', 'Name or {{field}}');

            catalog.setPlaceholder(placeholder);
            subCatalog.setPlaceholder(placeholder);
            name.setPlaceholder(placeholder);
            name.setWidth(250);
            active.bind('value', catalog, 'enabled');
            active.bind('value', subCatalog, 'enabled');
            active.bind('value', name, 'enabled');

            form.add(active, polymita.I18n.trans('active'), null, 'active');
            form.add(catalog, polymita.I18n.trans('I18ns', 'Labels', 'catalog'), null, 'catalog');
            form.add(subCatalog, polymita.I18n.trans('I18ns', 'Labels', 'subCatalog'), null, 'subCatalog');
            form.add(name, polymita.I18n.trans('I18ns', 'Labels', 'name'), null, 'name');
        }
    }
});