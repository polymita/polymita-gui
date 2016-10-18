/**
 * @ignore(Map)
 */
qx.Class.define("polymita.table.cellrenderer.Filter", {
    extend: polymita.table.cellrenderer.Request,

    members: {
        // override
        getRequest: function (cellInfo) {
            return new polymita.request.Filters(true);
        }
    }
});
