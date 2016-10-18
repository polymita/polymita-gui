/**
 * @asset(qx/icon/${qx.icontheme}/16/actions/dialog-apply.png)
 * @asset(qx/icon/${qx.icontheme}/16/actions/dialog-cancel.png)
 */
qx.Class.define("polymita.dialog.AbstractDialog", {
    type: "abstract",
    extend: qx.ui.window.Window,

    /**
     * Constructor
     *
     * @param caption {String} The caption text.
     * @param icon {String} The URL of the caption bar icon.
     */
    construct: function (caption, icon) {
        this.base(arguments, caption, icon);

        // Set properties
        this.set({
            modal: true,
            showMaximize: false,
            allowMaximize: false,
            showMinimize: false,
            allowMinimize: false,
            resizable: false,
            layout: new qx.ui.layout.VBox(10)
        });

        // Create content.
        this._createContent();

        // Create buttons actions
        this._createButtons();

        this.addListener("resize", this.center);
    },

    events: {
        accept: 'qx.event.type.Data',
        cancel: 'qx.event.type.Event'
    },

    properties: {},

    members: {

        _createContent: function () {
        },

        _createButtons: function () {
            this.__buttonPane = new qx.ui.container.Composite();
            var bpLayout = new qx.ui.layout.HBox(5);
            bpLayout.setAlignX("right");
            this.__buttonPane.setLayout(bpLayout);
            this.add(this.__buttonPane);

            return this.__buttonPane;
        },

        _createAcceptOrCancelButton: function () {
            var bP = this.__buttonPane,
                bA = new qx.ui.form.Button(this.tr("Accept"), "icon/16/actions/dialog-apply.png"),
                bC = new qx.ui.form.Button(this.tr("Cancel"), "icon/16/actions/dialog-cancel.png");

            bA.setAllowStretchX(true);
            bC.setAllowStretchX(true);
            bP.add(bA);
            bP.add(bC);

            bA.addListener("execute", function () {
                this.fireDataEvent('accept', null);
            }, this);
            bC.addListener("execute", function () {
                this.fireEvent('cancel', qx.event.type.Event);
                this.close();
            }, this);

            this.addListener("appear", function () {
                bC.focus();
            }, this);
        }
    }
});
