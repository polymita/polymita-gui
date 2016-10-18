qx.Class.define("polymita.form.dialog.HtmlEditor", {
    extend: polymita.form.dialog.AbstractField,

    // override
    construct: function () {
        this.base(arguments, polymita.I18n.trans('content'));

        // Set properties
        this.set({
            modal: true,
            showMaximize: true,
            allowMaximize: true,
            resizable: true,
            width: 600,
            height: 350
        });
    },

    members: {
        _createFormFields: function (form) {
            var content;

            this.base(arguments);

            content = new polymita.form.field.TextArea;
            content.setWrap(false);

            form.add(content, null, null, 'content');
        }
    }
});