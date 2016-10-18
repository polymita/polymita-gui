qx.Mixin.define("polymita.mixin.MProperties", {
    members: {
        loadProperties: function (pUrlOrClass, pCallback) {
            var url, id;

            if (!pUrlOrClass) {
                url = qx.util.ResourceManager.getInstance().toUri("polymita/properties/" + this.classname + ".json");
            } else if (qx.lang.Type.isString(pUrlOrClass)) {
                url = pUrlOrClass;
            } else {
                url = qx.util.ResourceManager.getInstance().toUri("polymita/properties/" + pUrlOrClass.classname + ".json");
            }

            polymita["properties"] = polymita["properties"] || {};
            id = qx.util.Base64.encode(url);

            if (!polymita["properties"][id]) {
                var req = new qx.io.request.Xhr(url);
                req.setAsync(false);
                req.addListener("success", function (e) {
                    polymita["properties"][id] = e.getTarget().getResponse();
                }, this);
                req.send();
            }

            if (typeof pCallback === "function") {
                pCallback.call(this, polymita["properties"][id] || {})
            } else {
                this.set(polymita["properties"][id] || {});
            }
        }
    }
});
