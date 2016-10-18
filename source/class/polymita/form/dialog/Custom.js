qx.Class.define("polymita.form.dialog.Custom", {
    extend: polymita.dialog.AbstractForm,

    /**
     * Constructor
     *
     * @param management {polymita.management.AbstractManagement}
     * @param action {String} Action id: ('add' or 'edit') value.
     * @param caption {String} The caption text.
     * @param icon {String} The URL of the caption bar icon.
     */
    construct: function (management, action, caption, icon) {
        var properties = management.getSettings().properties;

        this.set({
            management: management,
            //height: properties.formHeight,
            width: properties.formWidth,
            action: action
        });

        this.base(arguments, caption, icon);
        this.addListener("close", this.destroy);
    },

    properties: {
        management: {
            check: 'polymita.management.AbstractManagement'
        },

        action: {
            check: 'String'
        }
    },

    members: {
        _createFormFields: function (form) {
            var properties = this.getManagement().getSettings().properties,
                accessFormActionProperty = (this.getAction() == 'add') ? 'accessInAddForm' : 'accessInEditForm';

            properties.fields.forEach(function (field) {
                var widget,
                    widgetClass,
                    validator = null,
                    validatorClass,
                    label;

                if (field[accessFormActionProperty] != 'N') {
                    widgetClass = qx.Class.getByName(field.widgetClass);

                    if (widgetClass) {
                        widget = new widgetClass();
                        widget.setSettings && widget.setSettings(field);
                        widget.setWidth && widget.setWidth(Math.floor(this.getWidth() * 67 / 100));
                        widget.setFromJSON(field.properties);

                        if (field[accessFormActionProperty] == 'H') {
                            widget.setVisibility("excluded");
                        } else if (field[accessFormActionProperty] == 'R') {
                            // TODO: set property readOnly for all field type.
                            // Los campos con propiedad readOnly=true no son modificables pero si se incluyen
                            // en el getData del formulario. A diferencia de los enabled=false que no son
                            // modificables ni se incluyen en el getData del formulario.
                            widget.setReadOnly && widget.setReadOnly(true) || widget.setVisibility("excluded");
                        }

                        if (field.validatorClass) {
                            validatorClass = qx.Class.getByName(field.validatorClass);
                            if (!validatorClass) {
                                q.messaging.emit("Application", "error", this.tr("Class no found: '%1'.", field.validatorClass));
                            } else {
                                validator = new validatorClass();
                            }
                        } else {
                            validator = widgetClass.validatorClass ? new widgetClass.validatorClass : null;
                        }

                        label = polymita.I18n.trans(properties.i18n, 'Labels', field.name);
                        form.add(widget, label, validator, field.name, form);

                    } else {
                        q.messaging.emit("Application", "error", this.tr("Class no found: '%1'.", field.widgetClass));
                    }
                }
            }, this);

            this.initializeItems();
        }
    }
});