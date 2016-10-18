qx.Class.define("polymita.form.dialog.Search", {
    extend: polymita.dialog.AbstractForm,

    /**
     * Constructor
     *
     * @param management {polymita.management.AbstractManagement}
     * @param caption {String} The caption text.
     * @param icon {String} The URL of the caption bar icon.
     */
    construct: function (management, caption, icon) {
        var properties = management.getSettings().properties;

        this.set({
            management: management,
            height: properties.formHeight,
            width: properties.formWidth
        });

        this.base(arguments, caption, icon);
    },

    properties: {
        management: {
            check: 'polymita.management.AbstractManagement'
        }
    },

    members: {
        _createRenderer: function(){
            var renderer = new polymita.form.renderer.SingleWithCheck(this._form);
            renderer.getLayout().setColumnFlex(1, 0);
            renderer.getLayout().setColumnFlex(2, 1);
            this.add(renderer);
        },

        _createFormFields: function (form) {
            var properties = this.getManagement().getSettings().properties;

            properties.fields.forEach(function (field) {
                if (field.includeInSearch) {
                    var widgetClass = qx.Class.getByName(field.widgetClass);

                    if (widgetClass) {
                        var widget = new widgetClass();
                        widget.setWidth && widget.setWidth(Math.floor(this.getWidth() * 67 / 100));
                        widget.setFromJSON(field.properties);

                        if (qx.Class.hasProperty(widget.constructor, 'required')) {
                            widget.setRequired(false);
                        }

                        if (field.validatorClass) {
                            var validator,
                                validatorClass = qx.Class.getByName(field.validatorClass);

                            if (!validatorClass) {
                                q.messaging.emit("Application", "error", this.tr("Class no found: '%1'.", field.validatorClass));
                            } else {
                                validator = new validatorClass();
                            }
                        } else {
                            validator = widgetClass.validatorClass ? new widgetClass.validatorClass : null;
                        }

                        var label = polymita.I18n.trans(properties.i18n, 'Labels', field.name);
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