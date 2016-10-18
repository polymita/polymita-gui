/**
 * @ignore(google.*)
 * @ignore(head.*)
 */
qx.Class.define("polymita.management.GoogleMaps", {
    extend: polymita.management.AbstractManagement,

    statics: {
        properties: {
            i18n: {
                type: polymita.form.field.TextField,
                settings: { required: true, pattern: '^[A-Za-z0-9_-]+$', maxLength: 30, value: '' }
            },

            mapType: {
                type: polymita.form.field.TextField,
                settings: { required: true, pattern: '^(roadmap|satellite)$', maxLength: 15, value: 'roadmap' }
            },

            latitude: {
                type: polymita.form.field.NumberField,
                settings: { required: true, minimum: -89, maximum: 89, value: 1 }
            },

            longitude: {
                type: polymita.form.field.NumberField,
                settings: { required: true, minimum: -179, maximum: 179, value: 1 }
            },

            zoom: {
                type: polymita.form.field.IntegerField,
                settings: { required: true, minimum: 1, maximum: 100, value: 1 }
            },

            edge: {
                type: polymita.form.field.util.EdgeSelectBox,
                settings: { value: 'east' }
            },

            region: {
                type: polymita.form.field.IntegerField,
                settings: { required: true, minimum: 0, value: 30 }
            },

            primarySelectionComponentId: {
                type: polymita.form.field.IntegerField,
                settings: { required: true, minimum: 1, value: 3 }
            }
        }
    },

    // override
    construct: function (settings, customData, modulePage) {
        this.base(arguments, settings, customData, modulePage);

        this.set({
            mapType: settings.properties.mapType,
            latitude: settings.properties.latitude,
            longitude: settings.properties.longitude,
            zoom: settings.properties.zoom
        });

        if (typeof google == 'undefined' || typeof google.maps == 'undefined') {
            var locale = qx.locale.Manager.getInstance().getLocale();

            head.js('https://maps.google.com.cu/maps/api/js?sensor=false&language=' + locale,
                qx.lang.Function.bind(this._createMapContainer, this)
            );
        } else {
            this._createMapContainer()
        }

        this.addMessagingListener('selection-change',
            this.onSelectionChange,
            settings.properties.primarySelectionComponentId
        );
    },

    properties: {
        mapType: {
            check: ['roadmap', 'satellite'],
            init: 'roadmap'
        },

        latitude: {
            check: 'Number'
        },

        longitude: {
            check: 'Number'
        },

        zoom: {
            check: 'Integer',
            init: 1
        }
    },

    members: {
        __map: null,
        __marker: null,

        _createMapContainer: function () {
            var map = this._createGoogleMap(),
                title = new qx.ui.basic.Atom(polymita.I18n.trans('Localization'));

            title.set({ appearance: 'button', maxHeight: 30 });

            this.add(title, { flex: 1 });
            this.add(map, { flex: 2 });
        },

        _createGoogleMap: function () {
            var isle = new qx.ui.core.Widget();

            isle.addListenerOnce("appear", function () {
                try {
                    this.__map = new google.maps.Map(isle.getContentElement().getDomElement(), {
                        zoom: this.getZoom(),
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    });


                    var vLatLng = { lat: this.getLatitude(), lng: this.getLongitude() };
                    //Send localization request to google with latitude, longitude parameters.
                    this.__map.setCenter(vLatLng);
                    this.__marker = new google.maps.Marker({
                        position: vLatLng,
                        map: this.__map,
                        title: 'Hello World!'
                    });

                } catch (ex) {
                    var msg = "Could not create Google map!<br/>" + ex.toString();
                    isle.getContentElement().getDomElement().innerHTML += msg;
                }
            }, this);

            return isle;
        },

        /**
         * Fired when changed selection of component items.
         *
         * @param data {Object} Selected item data.
         */
        onSelectionChange: function (data) {
            if (data.customData != null) {
                var item = data.customData.item,
                    vLatLng = { lat: item.latitude, lng: item.longitude };

                this.__map.setCenter(vLatLng);
                this.__map.setZoom(item.zoom);
                this.__marker.setPosition(vLatLng);
                this.__marker.setTitle(item.name + "\n" + item.desctiption);
            }
        }
    }
});
