/**
 * @ignore(Map)
 */
qx.Class.define("polymita.table.cellrenderer.Role", {
    extend: polymita.table.cellrenderer.Request,

    members: {
        // override
        getRequest: function (cellInfo) {
            return new polymita.request.Roles(true);
        }
    }
});