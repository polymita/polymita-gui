qx.Class.define("polymita.form.validator.net.EMailField", {
    extend: polymita.form.validator.SyncValidator,

    members: {
        // overridden
        onValidate: function (item, value, context) {
            var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

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