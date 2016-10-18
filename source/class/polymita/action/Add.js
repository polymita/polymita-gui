/**
 * @asset(qx/icon/${qx.icontheme}/16/actions/list-add.png)
 */
qx.Class.define("polymita.action.Add", {
    extend: polymita.action.AbstractAction,

    construct: function (management) {
        this.base(arguments, management, 'add', 'icon/16/actions/list-add.png');
    },

    members: {
        onExecute: function () {
            var caption = polymita.I18n.trans(this.getManagement().getI18n(), 'Titles', 'Add'),
                dlg = new polymita.form.dialog.Custom(this.getManagement(), 'add', caption, this.getIcon());

            dlg.addListener('accept', this.onAccept, this);
            dlg.open();
        },

        onAccept: function (e) {
            this.emitMessaging('execute-add', e.getData(), { dlg: e.getTarget() });
        }
    }
});
