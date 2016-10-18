/**
 * @childControl textField {qx.ui.form.TextField} show the text of the content.
 * @childControl icon {qx.ui.basic.Image} show the filter icon.
 */
qx.Class.define("polymita.form.field.util.SearchTextField", {
    extend: qx.ui.core.Widget,
    implement: [
        qx.ui.form.IStringForm,
        qx.ui.form.IForm
    ],
    include: [
        qx.ui.form.MForm
    ],

    construct: function () {
        this.base(arguments);

        this.__text = this._createChildControlImpl('textField');
        this.__icon = this._createChildControlImpl('icon');

        var layout = new qx.ui.layout.HBox().set({
            alignY: "middle"
        });

        this._setLayout(layout);
        this.setPlaceholder(this.tr('Filter'));

        this.__text.bind('value', this, 'value');

        this.addListener('changeAppearance', this._onChangeAppearance, this);
    },

    properties: {
        // overridden
        focusable: {
            refine: true,
            init: true
        },

        // overridden
        appearance: {
            refine: true,
            init: 'search-text-field'
        },

        placeholder: {
            check: 'String',
            apply: '_applyPlaceholder'
        },

        value: {
            apply: '_applyValue',
            nullable: true
        },

        icon: {
            check: 'String',
            nullable: true,
            apply: '_applyIcon',
            themeable: true
        }
    },

    events: {
        'changeValue': 'qx.event.type.Data'
    },

    members: {

        _applyPlaceholder: function (value) {
            this.__text.setPlaceholder(value);
        },

        _applyValue: function (value) {
            this.__text.setValue(String(value === null ? '' : value));
        },

        _applyIcon: function (value) {
            this.__icon.setSource(value);
        },

        // overridden
        _createChildControlImpl: function (id, hash) {
            var control;

            switch (id) {
                case "textField":
                    control = new qx.ui.form.TextField().set({
                        liveUpdate: true,
                        paddingRight: 20,
                        appearance: this.getAppearance() + '/text-field'
                    });
                    control.addListener('changeValue', this._onChangeValue, this);

                    this._add(control, { flex: 1 });
                    break;

                case "icon":
                    control = new qx.ui.basic.Image(this.getIcon()).set({
                        appearance: 'search-text-field/icon'
                    });

                    this._add(control);
                    break;
            }

            return control || this.base(arguments, id);
        },

        // overridden
        getFocusElement: function () {
            var el = this.getContentElement();
            if (el) {
                return el;
            }
        },

        _onChangeValue: function (e) {
            if (this.__changeValueTimeoutHandle) {
                clearTimeout(this.__changeValueTimeoutHandle);
            }

            this.__changeValueTimeoutHandle = setTimeout(function (vThis) {
                vThis.fireEvent('changeValue', qx.event.type.Data, [e.getData()]);
                vThis.__changeValueTimeoutHandle = null;
            }, 500, this);
        },

        _onChangeAppearance: function (e) {
            this.__text.setAppearance(e.getData()+'/text-field');
        }
    }

});