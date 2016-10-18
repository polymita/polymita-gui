qx.Class.define("polymita.request.Users", {
    extend: polymita.request.AbstractResource,

    construct: function (sync) {
        this.base(arguments, 'Users', sync);
    }
});
