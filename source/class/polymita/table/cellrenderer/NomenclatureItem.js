qx.Class.define("polymita.table.cellrenderer.NomenclatureItem", {
    extend: polymita.table.cellrenderer.Request,

    members: {
        // override
        getRequest: function (cellInfo) {
            return new polymita.request.NomenclatureItems(true);
        }
    }
});
