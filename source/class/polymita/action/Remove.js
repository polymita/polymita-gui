/**
 * @asset(qx/icon/${qx.icontheme}/16/actions/list-remove.png)
 */
qx.Class.define("polymita.action.Remove", {
    extend: polymita.action.AbstractActionWithSelectedItem,

    construct: function (management) {
        this.base(arguments, management, 'remove', 'icon/16/actions/list-remove.png');
    },

    members: {

        onExecute: function () {
            var properties = this.getManagement().getSettings().properties,
                i18nCatalog = properties.i18n,
                msg = polymita.I18n.trans(i18nCatalog, 'Messages', 'CONFIRM-DELETING'),
                request = new polymita.request.Customs(properties.restServiceURL);

            polymita.dialog.Confirm.show(msg, function (response) {
                if (response == 'yes') {
                    request.remove(this.getSelectedItem().id, function (response) {
                        if (response.successful) {
                            msg = polymita.I18n.trans(i18nCatalog, 'Messages', 'SUCCESSFUL-DELETING');
                            q.messaging.emit('Application', 'good', msg);
                            this.emitMessaging('execute-remove', { index: this.getSelectedIndex() });
                        } else {
                            msg = polymita.I18n.trans(i18nCatalog, 'Messages', 'FAILED-DELETING');
                            q.messaging.emit('Application', 'error', msg);
                        }
                    }, this);
                }
            }, this);
        }
    }
});
