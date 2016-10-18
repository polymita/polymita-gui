qx.Class.define("polymita.form.validator.SyncValidator", {
    type: 'abstract',
    extend: qx.core.Object,
    include: qx.locale.MTranslation,
    implement: polymita.form.validator.IValidator,

    members: {
        call: function (context, value, item) {
            return this.onValidate(this.__item = item, value, context);
        },

        /**
         * This method should be called within the asynchronous callback to tell the
         * validator the result of the validation.
         *
         * @param valid {Boolean} The boolean state of the validation.
         * @param message {String?} The invalidMessage of the validation.
         */
        setValid: function (valid, message) {
            // message processing
            if (message !== undefined) this.__item.setInvalidMessage(message);
            this.__item.setValid(valid);

            return valid;
        }
    }
});