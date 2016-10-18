qx.Class.define("polymita.form.validator.net.MaskField", {
    extend: polymita.form.validator.SyncValidator,

    members: {
        // overridden
        onValidate: function (item, value, context) {
            var pattern = /^([1-9]|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])(\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){3}(\/\d{1,2}){0,1}\/([0-9]\d|1[0-9]\d|2[0-9]\d|3[0-2]\d)$/;

            if (value) {
                if (!pattern.test(value)) {
                    return this.setValid(false, this.tr('The value of this field is not valid'));
                } else {
                    return this.setValid(true);
                }
            } else if (item.isRequired()) {
                return this.setValid(false, this.tr('This field is required'));
            }
        }
    }
});