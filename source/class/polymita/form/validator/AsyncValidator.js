qx.Class.define("polymita.form.validator.AsyncValidator", {
    type: 'abstract',
    extend: qx.ui.form.validation.AsyncValidator,
    include: qx.locale.MTranslation,
    implement: polymita.form.validator.IValidator,

    construct: function () {
        this.base(arguments, function (validator, value) {
            setTimeout(function (context) {
                validator.onValidate(validator.__item, value, context);
            }, 100, this);
        })
    }
});