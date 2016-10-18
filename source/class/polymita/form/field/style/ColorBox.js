qx.Class.define("polymita.form.field.style.ColorBox", {
    extend: polymita.form.field.util.AbstractSelectBox,

    construct: function () {
        this.base(arguments);
        this.setRequired(true);
        this.setMinWidth(250);

        var items = [
                'inherit', 'aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 'lime', 'maroon',
                'navy', 'olive', 'purple', 'red', 'silver', 'teal', 'white', 'yellow'
            ],
            converter = function (data) {
                return (data != 'inherit') ? data : null;
            };

        items.forEach(function (item) {
            var listItem = new qx.ui.form.ListItem(polymita.I18n.trans('Styles', 'Colors', item), null, item);

            listItem.bind('model', listItem, 'backgroundColor', { converter: converter });
            this.add(listItem);
        }, this);

        this.getChildControl('atom').set({
            center: true,
            allowGrowX: false,
            width: Math.max(this.getWidth(), this.getMinWidth())
        })

        this.addListener('changeSelection', function (e) {
            var selection = e.getData()[0];
            this.getChildControl('atom').setBackgroundColor(converter(selection ? selection.getModel() : 'inherit'));
        }, this);
    }
});