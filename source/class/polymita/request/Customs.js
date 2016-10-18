qx.Class.define("polymita.request.Customs", {
    extend: polymita.request.AbstractResource,

    construct: function (restServiceURL, sync) {
        this.base(arguments, restServiceURL, sync);
    }
});
