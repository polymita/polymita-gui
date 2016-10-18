qx.Class.define("polymita.form.dialog.GridRendererStyle", {
    extend: polymita.form.dialog.AbstractField,

    // override
    construct: function () {
        this.base(arguments, polymita.I18n.trans('styles') + ':');
    },

    members: {
        _createFormFields: function (form) {
            this.base(arguments);

            var textAlign = new polymita.form.field.style.AlignBox,
                textColor = new polymita.form.field.style.ColorBox,
                fontWeight = new polymita.form.field.style.WeightBox,
                fontStyle = new polymita.form.field.style.FontBox;

            form.add(textAlign, polymita.I18n.trans('Styles', 'Labels', 'align'), null, 'textAlign');
            form.add(textColor, polymita.I18n.trans('Styles', 'Labels', 'color'), null, 'textColor');
            form.add(fontWeight, polymita.I18n.trans('Styles', 'Labels', 'weight'), null, 'fontWeight');
            form.add(fontStyle, polymita.I18n.trans('Styles', 'Labels', 'style'), null, 'fontStyle');
        }
    }
});