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
            var management = this.getManagement(),
                i18nCatalog = management.getI18n(),
                itemLabel = polymita.I18n.trans(i18nCatalog, 'Labels', 'SINGLE-ITEM-REFERENCE'),
                caption = polymita.I18n.trans(i18nCatalog, 'Titles', 'Add', [itemLabel]),
                dlg = new polymita.form.dialog.Custom(management, 'add', caption, this.getIcon());

            dlg.addListener('accept', this.onAccept, this);
            dlg.open();
        },

        onAccept: function (e) {
            this.emitMessaging('execute-add', e.getData(), { dlg: e.getTarget() });
        }
    }
});
