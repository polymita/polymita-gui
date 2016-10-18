qx.Class.define("polymita.form.field.grid.ColumnWidth", {
    extend: qx.ui.form.TextField,
    include: polymita.form.field.util.MSetProperties,

    statics: {
        validatorClass: polymita.form.validator.TextField
    },

    construct: function () {
        this.base(arguments);
        this.set({
            placeholder: 'AUTO'
        })
    },

    properties: {
        pattern: {
            check: 'String',
            init: '^([0-9]+%?)$'
        },

        filter: {
            refine: true,
            init: /[0-9%]/
        },

        minLength: {
            check: 'Integer',
            init: 1
        }
    },

    members: {
        setValue: function (v) {
            this.base(arguments, String(v || ''));
        }
    }

});