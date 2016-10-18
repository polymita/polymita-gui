qx.Class.define("polymita.dialog.Waiting", {
    type: "singleton",
    extend: qx.ui.window.Window,

    statics: {
        activates: 0,

        activate: function () {
            if (this.activates == 0) {
                this.getInstance().show();
                this.getInstance().center();
            }
            this.activates++;
        },

        release: function () {
            if (this.activates > 0) {
                this.activates--;
            }
            if (this.activates == 0) {
                this.getInstance().hide();
            }
        }
    },

    /**
     * Constructor
     */
    construct: function () {
        this.base(arguments);

        // Set properties
        this.set({
            //modal: true,
            showMaximize: false,
            showMinimize: false,
            showClose: false,
            allowMaximize: false,
            allowMinimize: false,
            allowClose: false,
            alwaysOnTop: true,
            resizable: false,
            appearance: 'waiting',
            layout: new qx.ui.layout.VBox(0)
        });

        this.addListener("resize", this.center);
    }
});
