qx.Class.define("polymita.layout.LeftBox", {
    type: "singleton",
    extend: qx.ui.container.Composite,

    /**
     * Constructor
     */
    construct: function () {
        this.base(arguments);
        this.setWidth(250);
        this.setLayout(new qx.ui.layout.VBox(5));
        this.setAllowGrowY(false);

        var modules = polymita.tree.Modules.getInstance(),
            filterField = new polymita.form.field.util.SearchTextField().set({
                appearance: 'filter-text-field'
            });

        modules.setFilter(filterField);

        this.add(filterField, { flex: 1 });
        this.add(modules, { flex: 2 });
    },

    members: {}
});
