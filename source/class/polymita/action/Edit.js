qx.Class.define("polymita.action.Edit", {
    extend: polymita.action.AbstractActionWithSelectedItem,

    construct: function (management) {
        this.base(arguments, management, 'edit', 'polymita/icon/16/actions/edit.png');
    },

    members: {
        onExecute: function () {
            var caption = polymita.I18n.trans(this.getManagement().getI18n(), 'Titles', 'Edit'),
                dlg = new polymita.form.dialog.Custom(this.getManagement(), 'edit', caption, this.getIcon());

            dlg.addListener('accept', this.onAccept, this);
            dlg.setData(this.getSelectedItem());
            dlg.open();
        },

        onAccept: function (e) {
            this.emitMessaging('execute-update', e.getData(), { dlg: e.getTarget() });
        }
    }
});
