qx.Class.define("polymita.form.field.util.EdgeSelectBox", {
    extend: polymita.form.field.util.AbstractSelectBox,

    construct: function () {
        this.base(arguments);
        this.setRequired(true);
        ['center', 'east', 'north', 'south', 'west'].forEach(function (edge) {
            this.add(new qx.ui.form.ListItem(polymita.I18n.trans(edge), null, edge));
        }, this);
    }
});