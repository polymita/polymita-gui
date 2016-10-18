/**
 * @ignore(Map)
 */
qx.Class.define("polymita.table.cellrenderer.Pattern", {
    extend: polymita.table.cellrenderer.Request,

    members: {
        // override
        getRequest: function (cellInfo) {
            return new polymita.request.Patterns(true);
        }
    }
});
