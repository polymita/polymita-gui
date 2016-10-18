qx.Class.define("polymita.management.HtmlEmbed", {
    extend: polymita.management.AbstractManagement,

    statics: {
        properties: {
            i18n: {
                type: polymita.form.field.TextField,
                settings: {required: true, pattern: '^[A-Za-z0-9_-]+$', maxLength: 30, value: ''}
            },
            content: {
                type: polymita.form.field.util.Html,
                settings: {required: true, minLength: 0, maxLength: 255, value: ''}
            },
            edge: {
                type: polymita.form.field.util.EdgeSelectBox,
                settings: {value: 'east'}
            },
            region: {
                type: polymita.form.field.IntegerField,
                settings: {required: true, minimum: 0, value: 30}
            }
        }
    },

    // override
    construct: function (settings, customData, modulePage) {
        this.base(arguments, settings, customData, modulePage);

        var htmlEmbed = new qx.ui.embed.Html(settings.properties.content);

        htmlEmbed.set({
            overflowX: 'auto',
            overflowY: 'auto'
        });

        this.add(htmlEmbed, {flex: 1});
    }
});