/* ************************************************************************

 Copyright:

 License:

 Authors:

 ************************************************************************ */

/**
 * Here you documentation for you class
 *
 */
qx.Class.define("polymita.layout.Footer", {
    type: "singleton",
    extend: qx.ui.container.Composite,

    /**
     * Constructor
     */
    construct: function () {
        this.base(arguments);

        this.setLayout(new qx.ui.layout.HBox);
        this.setAppearance("app-footer");

        this.add(new qx.ui.basic.Label(this.tr("Copyright")));
        this.add(new qx.ui.core.Spacer, {flex: 1});
        this.add(new qx.ui.basic.Label(this.tr("copyright-company")));
    }
});
