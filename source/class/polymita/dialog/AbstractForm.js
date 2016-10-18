qx.Class.define("polymita.dialog.AbstractForm", {
    type: "abstract",
    extend: polymita.dialog.AbstractDialog,

    members: {
        _form: null,
        _model: null,

        _createContent: function () {
            // Create form login
            this._form = new qx.ui.form.Form();

            // Create form fields
            this._createFormFields(this._form);

            // Add from renderer
            this._createRenderer();

            // Define form data controller and get model.
            var controller = new qx.data.controller.Form(null, this._form);
            this._model = controller.createModel();
        },

        _createRenderer: function () {
            var renderer = new polymita.form.renderer.SingleWithOptionalLabel(this._form);

            this.add(renderer, { flex: 1 });
        },

        _createButtons: function () {
            this._createAcceptOrCancelButton();
        },

        _createAcceptOrCancelButton: function () {
            var bA = new qx.ui.form.Button(this.tr("Accept"), "icon/16/actions/dialog-apply.png"),
                bC = new qx.ui.form.Button(this.tr("Cancel"), "icon/16/actions/dialog-cancel.png"),
                manager = this._form.getValidationManager();

            bA.setAllowStretchX(true);
            bC.setAllowStretchX(true);
            this._form.addButton(bA);
            this._form.addButton(bC);

            bA.addListener("execute", function () {
                bA.setEnabled(false);
                bA.setLabel(this.tr("Validating..."));
                manager.validate();
            }, this);

            bC.addListener("execute", function () {
                this.fireEvent('cancel', qx.event.type.Event, null);
                this.close();
            }, this);

            this.addListener("appear", function () {
                bC.focus();
            }, this);

            manager.addListener("complete", function () {
                // configure the accept button
                bA.setEnabled(true);
                bA.setLabel(this.tr("Accept"));
                // check the validation status
                if (manager.getValid()) {
                    this.fireDataEvent('accept', this.getData());
                }
            }, this);
        },

        redefineResetter: function () {
            this._form.redefineResetter();
        },

        reset: function () {
            this._form.reset();
            return this;
        },

        initializeItems: function () {
            var name, items = this._form.getItems();

            for (name in items) {
                items[name].initialize && items[name].initialize();
            }
        },

        getData: function () {
            var data = qx.util.Serializer.toNativeObject(this._model),
                name, items = this._form.getItems();

            // Remove disabled items.
            for (name in items) {
                if (!items[name].isEnabled()) {
                    delete data[name]
                }
            }

            return data;
        },

        setData: function (data, redefineResetter) {
            qx.Class.getProperties(this._model.constructor).forEach(function (name) {
                if (typeof data[name] != 'undefined') {
                    this._model.set(name, data[name]);
                }
            }, this);

            redefineResetter && this.redefineResetter();
            return this;
        }
    },

    destruct: function () {
        var name, items = this._form.getItems();

        for (name in items) {
            items[name].destroy();
        }

        this._form.getButtons().forEach(function (item) {
            item.destroy();
        });

        this.getChildren().forEach(function (item) {
            item.destroy();
        });
    }
});
