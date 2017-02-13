qx.Mixin.define("polymita.mixin.MProperties", {
    members: {
        loadProperties: function (pUrlOrClass, pCallback) {
            var url, id, path;

            pUrlOrClass = pUrlOrClass || this.constructor;

            if (qx.lang.Type.isString(pUrlOrClass)) {
                if (!pUrlOrClass.match(/\//)) {
                    path = this.constructor.classname.replace(/\.[^\.]+$/, '').replace(/\./g, '/');
                    pUrlOrClass = path + '/properties/' + pUrlOrClass;
                }
            } else {
                path = pUrlOrClass.classname.replace(/\.[^\.]+$/, '').replace(/\./g, '/');
                pUrlOrClass = qx.util.ResourceManager.getInstance().toUri(path + "/properties/" + pUrlOrClass.classname + ".json");
            }

            url = qx.util.ResourceManager.getInstance().toUri(pUrlOrClass);

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
