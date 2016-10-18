qx.Class.define("polymita.action.AddInChildren", {
    extend: polymita.action.Add,

    construct: function (management) {
        this.base(arguments, management);
        this.setEnabled(false);
        this.addMessagingListener('selection-change',
            this.onSelectionChange,
            management.getSettings().properties.primarySelectionComponentId
        );
    },

    members: {
        onSelectionChange: function (data) {
            this.setEnabled(data.customData != null);
        }
    }
});
