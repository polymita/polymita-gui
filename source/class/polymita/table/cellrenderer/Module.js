/**
 * @ignore(Map)
 */
qx.Class.define("polymita.table.cellrenderer.Module", {
    extend: polymita.table.cellrenderer.Request,

    members: {
        // override
        getRequest: function (cellInfo) {
            return new polymita.request.Modules(true);
        }
    }
});
