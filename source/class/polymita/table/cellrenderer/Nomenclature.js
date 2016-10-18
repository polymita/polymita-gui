/**
 * @ignore(Map)
 */
qx.Class.define("polymita.table.cellrenderer.Nomenclature", {
    extend: polymita.table.cellrenderer.Request,

    members: {
        // override
        getRequest: function (cellInfo) {
            return new polymita.request.Nomenclatures(true);
        }
    }
});
