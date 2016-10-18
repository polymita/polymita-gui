qx.Class.define("polymita.form.dialog.SwitchRadioBox", {
    extend: polymita.form.dialog.AbstractField,

    /**
     * Constructor
     *
     * @param caption {String} The caption text.
     * @param SwitchRadioBoxClass {Class}
     */
    construct: function (caption, SwitchRadioBoxClass) {
        this.setSwitchRadioBoxClass(SwitchRadioBoxClass);
        this.base(arguments, caption);
    },

    properties: {
        SwitchRadioBoxClass: {
            check: 'Class'
        }
    },

    members: {
        _createFormFields: function (form) {
            this.base(arguments);

            this._field = new (this.getSwitchRadioBoxClass())();
            form.add(this._field, this.tr("Value"), null, "value");

            this.addListener("appear", function (e) {
                this._field.focus();
            }, this);
        },

        setData: function (data, redefineResetter) {
            this._field.setValue(data.value);
            redefineResetter && this.redefineResetter();

            return this;
        },

        getData: function () {
            return { value: this._field.getValue() };
        }
    }
});