qx.Class.define("polymita.management.RemotePage", {
    extend : polymita.management.AbstractManagement,

    statics: {
        properties: {
            i18n: {
                type: polymita.form.field.TextField,
                settings: { required: true, pattern: '^[A-Za-z0-9_-]+$', maxLength: 30, value: '' }
            },
            name: {
                type: polymita.form.field.TextField,
                settings: { required: true, maxLength: 255, value: '' }
            },

            src: {
                type: polymita.form.field.TextField,
                settings: { required: true, maxLength: 255, value: '/src' }
            },
            edge: {
                type: polymita.form.field.util.EdgeSelectBox,
                settings: { value: 'east' }
            },
            region: {
                type: polymita.form.field.IntegerField,
                settings: { required: true, minimum: 0, value: 30 }
            }
        }
    },
    properties: {
        //src: {}
    },
    members: {
        construct: function(settings, customData, modulePage){
            this.base(arguments,settings, customData, modulePage);

            var frame = new qx.ui.embed.ThemedIframe();

            frame.setSource(settings.properties.src);
            frame.
            this.add(frame);

        }
    }


});
