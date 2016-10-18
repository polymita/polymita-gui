qx.Class.define("polymita.action.Test", {
    extend: polymita.action.AbstractAction,

    construct: function (management) {
        this.base(arguments, management, 'test', 'polymita/icon/16/actions/add.png');
    },

    members: {
        onExecute: function () {
            var caption = polymita.I18n.trans(this.getManagement().getI18n(), 'Titles', 'Add'),
                dlg = new polymita.form.dialog.Test(this.getManagement(), 'add', caption, this.getIcon());

            dlg.addListener('accept', this.onAccept, this);
            dlg.open();
        },

        onAccept: function (e) {
            console.log('TEST ACCEPT');
        }
    }
});
