/**
 * @require(polymita.management.Properties)
 */
qx.Mixin.define("polymita.mixin.MComponents", {

    properties: {
        serverBaseUrl: {
            init: null
        },

        locale: {
            check: 'String',
            apply: '__applyLocale'
        }
    },

    members: {
        __applyLocale: function (v) {
            var manager = qx.locale.Manager.getInstance();
            manager.setLocale(v);
        },

        registerComponents: function(){
            this.registerActionComponents([
                polymita.action.Actions,
                polymita.action.Add,
                polymita.action.AddInChildren,
                polymita.action.Components,
                polymita.action.Edit,
                polymita.action.Fields,
                polymita.action.Reload,
                polymita.action.Remove,
                polymita.action.Separator,
                polymita.action.Search,
                polymita.action.Test
            ]);

            this.registerFormFieldComponents([
                // Network components.
                polymita.form.field.net.MaskField,
                polymita.form.field.net.IpV4Field,
                polymita.form.field.net.EMailField,

                // Nomenclature components.
                polymita.form.field.nomenclature.SelectBox,
                polymita.form.field.nomenclature.ItemSelectBox,

                // Safety components.
                polymita.form.field.safety.ACLPermission,
                polymita.form.field.safety.RoleSelectBox,
                polymita.form.field.safety.UserSelectBox,
                polymita.form.field.safety.PatternSelectBox,
                polymita.form.field.safety.FilterSelectBox,
                polymita.form.field.safety.PasswordField,

                // Boolean components.
                polymita.form.field.boolean.CheckBox,
                polymita.form.field.boolean.RadioBox,
                polymita.form.field.boolean.SelectBox,

                // Remote components.
                polymita.form.field.remote.FilteringSelectBox,
                polymita.form.field.remote.RestSelectBox,

                // General components for bigness.
                polymita.form.field.DateField,
                polymita.form.field.GenderRadioBox,
                polymita.form.field.IntegerField,
                polymita.form.field.LocalSelectBox,
                polymita.form.field.SimpleQuestionRadioBox,
                polymita.form.field.SwitchRadioBox,
                polymita.form.field.TextArea,
                polymita.form.field.TextField,
                polymita.form.field.NumberField,

                // Specific components for use to develop and configure modules.
                polymita.form.field.util.ActionSelectBox,
                polymita.form.field.util.FormAccessBox,
                polymita.form.field.util.FieldTypeSelectBox,
                polymita.form.field.util.FieldValidatorSelectBox,
                polymita.form.field.util.ManagementSelectBox,
                polymita.form.field.util.ModuleFilteringSelectBox,
                polymita.form.field.util.ModuleSelectBox,
                polymita.form.field.util.I18nActionName
            ]);

            this.registerFormFieldValidators([
                polymita.form.validator.TextField,
                polymita.form.validator.TextArea,
                polymita.form.validator.net.MaskField,
                polymita.form.validator.net.IpV4Field,
                polymita.form.validator.net.EMailField
            ]);

            this.registerManagementComponents([
                polymita.management.DataGridRestService,
                polymita.management.GoogleMaps,
                polymita.management.HtmlEmbed,
                polymita.management.MarkdownEmbed
            ]);
        }
    }
});
