qx.Class.define("polymita.form.field.style.FontBox", {
    extend: polymita.form.field.util.AbstractSelectBox,

    construct: function () {
        this.base(arguments);
        this.setRequired(true);

        var items = ['inherit', 'normal', 'italic', 'oblique'];

        items.forEach(function (item) {
            this.add(new qx.ui.form.ListItem(polymita.I18n.trans('Styles', 'Labels', item), null, item));
        }, this);
    }
});