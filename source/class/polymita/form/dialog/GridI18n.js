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
                name = new polymita.form.field.TextField;

            name.setWidth(200);

            form.add(active, polymita.I18n.trans('active'), null, 'active');
            form.add(catalog, polymita.I18n.trans('I18ns', 'Labels', 'catalog'), null, 'catalog');
            form.add(subCatalog, polymita.I18n.trans('I18ns', 'Labels', 'subCatalog'), null, 'subCatalog');
            form.add(name, polymita.I18n.trans('I18ns', 'Labels', 'name'), null, 'name');
        }
    }
});