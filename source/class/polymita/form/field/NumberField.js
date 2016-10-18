qx.Class.define("polymita.form.field.NumberField", {
    extend: qx.ui.form.Spinner,
    include: [
        polymita.form.field.util.MSetProperties,
        polymita.form.field.util.MReadOnly
    ],

    statics: {
        cellRendererType: polymita.table.cellrenderer.Number,

        properties: {
            required: {
                type: polymita.form.field.boolean.CheckBox,
                settings: { value: false }
            },
            minimum: {
                type: 'polymita.form.field.NumberField',
                settings: { required: true, value: -Number.MAX_VALUE, singleStep: 0.5 }
            },
            maximum: {
                type: 'polymita.form.field.NumberField',
                settings: { required: true, value: Number.MAX_VALUE, singleStep: 0.5 }
            },
            maximumFractionDigits: {
                type: 'polymita.form.field.IntegerField',
                settings: { required: true, value: 3 }
            },
            minimumFractionDigits: {
                type: 'polymita.form.field.IntegerField',
                settings: { required: true, value: 1 }
            },
            value: {
                type: 'polymita.form.field.NumberField',
                settings: { required: false, value: 1 }
            },
            postfix: {
                type: 'polymita.form.field.TextField',
                settings: { required: false, value: "" }
            },
            prefix: {
                type: 'polymita.form.field.TextField',
                settings: { required: false, value: "" }
            },
            singleStep: {
                type: 'polymita.form.field.NumberField',
                settings: { required: true, value: 0.5, singleStep: 0.1, minimum: 1 / 1000000 }
            },
            gridColumnWidth: {
                type: 'polymita.form.field.IntegerField',
                settings: {}
            },
            gridRendererStyle: {
                type: polymita.form.field.grid.RendererStyle,
                settings: { required: true, value: '{}' }
            }
        },

        parseValue: function (value) {
            var n = new Number(value);
            return n.valueOf();
        }
    },

    // override
    construct: function () {
        this.base(arguments);
        this.setValue(null);
        this.setNumberFormat(new qx.util.format.NumberFormat);
    },

    properties: {
        minimum: {
            refine: true,
            init: -Number.MAX_VALUE
        },

        maximum: {
            refine: true,
            init: Number.MAX_VALUE
        },

        maximumFractionDigits: {
            init: 3,
            apply: '_applyMaximumFraction'
        },

        minimumFractionDigits: {
            init: 1,
            apply: '_applyMinimumFraction'
        },

        postfix: {
            check: 'String',
            nullable: true,
            apply: '_applyPostfix'
        },

        prefix: {
            check: 'String',
            nullable: true,
            apply: '_applyPrefix'
        }
    },

    members: {
        _updateButtons: function () {
            if (!this.isReadOnly()) {
                this.base(arguments);
            }
        },

        _applyMaximumFraction: function (value) {
            this.getNumberFormat().setMaximumFractionDigits(value);
        },

        _applyMinimumFraction: function (value) {
            this.getNumberFormat().setMinimumFractionDigits(value);
        },

        _applyPostfix: function (value) {
            this.getNumberFormat().setPostfix(value || "");
        },

        _applyPrefix: function (value) {
            this.getNumberFormat().setPrefix(value || "");
        },

        // overridden
        _checkValue: function (value) {
            if (value === "" || value === null) {
                return true;
            }
            return this.base(arguments, value);
        },

        // overridden
        _onTextChange: function (e) {
            var value = this.getChildControl("textfield").getValue();

            if (!this.isRequired() && (value === "" || value === null)) {
                this.setValue(null);
            } else {
                this.base(arguments, e);
            }
        },

        // overridden
        _onRoll: function (e) {
            if (!this.isReadOnly()) {
                var textField = this.getChildControl('textfield'),
                    focusedWidget = qx.ui.core.FocusHandler.getInstance().getFocusedWidget();

                // If this widget has the focus then apply parent _onRoll.
                if ((focusedWidget == this) || (focusedWidget == textField)) {
                    this.base(arguments, e);
                }
            }
        }
    }
});