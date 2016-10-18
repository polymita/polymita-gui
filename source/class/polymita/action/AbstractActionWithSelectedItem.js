qx.Class.define("polymita.action.AbstractActionWithSelectedItem", {
    type: 'abstract',
    extend: polymita.action.AbstractAction,

    construct: function (management, label, icon) {
        this.base(arguments, management, label, icon);
        this.setEnabled(false);
        this.addMessagingListener('selection-change', this.onSelectionChange);
    },

    properties: {
        selectedItem: {
            nullable: true
        },

        selectedIndex: {
            nullable: true
        }
    },

    members: {
        onSelectionChange: function (data) {
            this.set((data.customData == null)
                    ? { enabled: false, selectedItem: null, selectedIndex: null }
                    : { enabled: true, selectedItem: data.customData.item, selectedIndex: data.customData.index }
            );
        }
    }
});
