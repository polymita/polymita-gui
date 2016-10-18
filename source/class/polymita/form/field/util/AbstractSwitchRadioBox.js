qx.Class.define("polymita.form.field.util.AbstractSwitchRadioBox", {
    type: 'abstract',
    extend: qx.ui.container.Composite,
    implement: [
        qx.ui.form.IForm,
        qx.ui.form.IBooleanForm
    ],
    include: [
        qx.ui.form.MForm,
        polymita.form.field.util.MSetProperties,
        polymita.form.field.util.MReadOnly
    ],

    construct: function (v1, v2) {
        this.base(arguments);
        this.set({
            layout: new qx.ui.layout.HBox(5),
            decorator: 'white-box',
            padding: 3,
            minWidth: 100,
            focusable: true
        });

        var properties = [
                String(v1).toLowerCase() + 'Label',
                String(v2).toLowerCase() + 'Label'
            ],
            labels = [
                polymita.I18n.trans(this.get(properties[0])),
                polymita.I18n.trans(this.get(properties[1]))
            ];

        this._values = [v1, v2];
        this._fields = [
            new qx.ui.form.RadioButton(labels[0]),
            new qx.ui.form.RadioButton(labels[1])
        ];

        this.add(this._fields[0], { flex: 1 });
        this.add(this._fields[1], { flex: 2 });

        this._fields[0].bind('value', this, 'value');
        this._fields[1].addListener('changeValue', this._onChangeValue, this);

        new qx.ui.form.RadioGroup(this._fields[1], this._fields[0]);
    },

    events: {
        'changeValue': 'qx.event.type.Data'
    },

    members: {
        _applyValue: function (value) {
            this._fields[0].setValue((value === true) || (value === this._values[0]));
        },

        _transformValue: function (value) {
            if (value === true) {
                value = this._values[0];
            } else if (value === false) {
                value = this._values[1];
            }

            return value;
        },

        _onChangeValue: function (e) {
            var focusTarget = this.getFocusTarget();
            if (focusTarget == this) {
                (e.getTarget().getValue() ? this._fields[1] : this._fields[0]).focus();
            }
        },

        focus: function () {
            this._fields[0].focus();
        }
    }
});