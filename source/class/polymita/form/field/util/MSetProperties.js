qx.Mixin.define("polymita.form.field.util.MSetProperties", {

    properties: {
        settings: {
            check: 'Object',
            init: {}
        }
    },

    members: {
        /**
         * Loads property values from a JSON or a map and ignore the properties
         * that do not belong to the current instance.
         *
         * @param data {String|Map}
         */
        setFromJSON: function (data) {
            data = qx.lang.Type.isString(data) ? qx.lang.Json.parse(data) : data;
            for (var prop in data) {
                if (this.canWriteProperty(prop)) {
                    this.set(prop, data[prop]);
                }
            }
        },

        canWriteProperty: function (name) {
            return qx.Class.hasProperty(this.constructor, name) || this["set" + qx.Bootstrap.firstUp(name)]
        }
    }

});