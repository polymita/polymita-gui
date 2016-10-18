qx.Class.define("polymita.form.Test", {
    type: "singleton",
    extend: polymita.dialog.AbstractForm,

    construct: function () {
        this.base(arguments, this.tr("Work plan data"), "polymita/icon/16/actions/add.png");
        this.addListener('accept', this.onExecuteAccept, this);
    },

    members: {
        _createFormFields: function (form) {
            // add id field
            var id = new polymita.form.field.NullSpinner();
            id.setVisibility("excluded");
            form.add(id, this.tr("Id"), null, "id");

            // add title field
            var title = new qx.ui.form.TextField();
            title.setRequired(true);
            title.setWidth(230);
            form.add(title, this.tr("Title"), null, "title");

            // add objectives field
            var objectives = new qx.ui.form.TextArea();
            objectives.setRequired(true);
            form.add(objectives, this.tr("Objectives"), null, "objectives");

            // add isPlublic field
            var isPublic = new qx.ui.form.CheckBox();
            form.add(isPublic, this.tr("Is public"), null, "isPublic");
        },

        onExecuteAccept: function (e) {
            var data = e.getData(),
                request = new polymita.request.Workplan();

            if (!data.id) {
                delete data.id;
                request.create(data, this.onSaved, this);
            } else {
                request.update(data.id, data, this.onSaved, this);
            }
        },

        onSaved: function (response) {
            if (response.successful) {
                q.messaging.emit("Application", "good", this.tr("Operation successful"));
                q.messaging.emit("Application", "update-workplans");

                this.close();
            }
        }
    }
});