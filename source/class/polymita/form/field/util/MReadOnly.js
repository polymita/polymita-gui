qx.Mixin.define("polymita.form.field.util.MReadOnly", {
    properties: {
        readOnly: {
            check: 'Boolean',
            init: false,
            apply: '_applyReadOnly'
        }
    },

    members: {
        _applyReadOnly: function (value, old) {
            if (value) {
                this.addState('readonly');
            } else {
                this.removeState('readonly')
            }

            this._getChildren().forEach(function (child) {
                if (child.setReadOnly) {
                    child.setReadOnly(value);
                } else {
                    child.setEnabled && child.setEnabled(!value);
                }
            });
        }
    }
});