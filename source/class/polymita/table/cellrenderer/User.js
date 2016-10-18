/**
 * @ignore(Map)
 */
qx.Class.define("polymita.table.cellrenderer.User", {
    extend: polymita.table.cellrenderer.Request,

    members: {
        // override
        getRequest: function (cellInfo) {
            return new polymita.request.Users(true);
        }
    }
});
