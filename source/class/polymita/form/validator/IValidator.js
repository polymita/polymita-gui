qx.Interface.define("polymita.form.validator.IValidator", {
    members: {
        /**
         * The validate function should only be called by
         * {@link qx.ui.form.validation.Manager}.
         *
         * It stores the given information and calls the validation function set in
         * the constructor. The method is used for form fields only. Validating a
         * form itself will be invokes with {@link #validateForm}.
         *
         * @param item {qx.ui.core.Widget} The form item which should be validated.
         * @param value {var} The value of the form item.
         * @param context {var?null} The context of the validator.
         *
         * @internal
         */
        onValidate: function (item, value, context) {
        }
    }
});