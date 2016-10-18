/* ************************************************************************

 Copyright:

 License:

 Authors:

 ************************************************************************ */

qx.Theme.define("polymita.theme.xabal.Appearance", {
    extend: qx.theme.indigo.Appearance,

    appearances: {
        "app-footer": {
            style: function () {
                return {
                    decorator: "app-footer",
                    font: "footer",
                    padding: 5,
                    textColor: "text-selected",
                    alignY: "middle",
                    alignX: "center"
                };
            }
        },

        "app-header": {
            style: function () {
                return {
                    font: "headline",
                    textColor: "text-selected",
                    decorator: "app-header",
                    alignY: "middle",
                    padding: 6
                };
            }
        },

        "content-box": {
            style: function () {
                return {
                    decorator: "content-box-odd",
                    textAlign: "justify",
                    margin: 5,
                    marginBottom: 10,
                    padding: 5,
                    cursor: "text"
                }
            }
        },

        /**
         * ---------------------------------------------------------------------------
         * PROPERTIES PANEL
         * ---------------------------------------------------------------------------
         */
        "properties": {
            style: function () {
                return {
                    decorator: "main",
                    padding: 0
                };
            }
        },

        "properties/title": {
            style: function () {
                return {
                    decorator: "table-header-column-button",
                    font: 'bold',
                    center: true
                };
            }
        },

        "properties/form-panel/pane": "pane",
        "properties/form-panel/scrollbar-x": "scrollbar",
        "properties/form-panel/scrollbar-y": "scrollbar",

        /**
         * ---------------------------------------------------------------------------
         * TAB VIEW
         * ---------------------------------------------------------------------------
         */
        "tabview/pane": {
            style: function (states) {
                return {
                    backgroundColor: "background",
                    decorator: "main",
                    padding: 3
                };
            }
        },

        "tabview-page/button": {
            style: function (states) {
                var decorator;

                // default padding
                if (states.barTop || states.barBottom) {
                    var padding = [3, 8];
                } else {
                    var padding = [8, 4, 8, 4];
                }

                // decorator
                if (states.checked) {
                    if (states.barTop) {
                        decorator = "tabview-page-button-top-active";
                    } else if (states.barBottom) {
                        decorator = "tabview-page-button-bottom-active"
                    } else if (states.barRight) {
                        decorator = "tabview-page-button-right-active";
                    } else if (states.barLeft) {
                        decorator = "tabview-page-button-left-active";
                    }
                } else {
                    if (states.barTop) {
                        decorator = "tabview-page-button-top";
                    } else if (states.barBottom) {
                        decorator = "tabview-page-button-bottom";
                    } else if (states.barRight) {
                        decorator = "tabview-page-button-right";
                    } else if (states.barLeft) {
                        decorator = "tabview-page-button-left";
                    }
                }

                return {
                    zIndex: states.checked ? 10 : 5,
                    decorator: decorator,
                    textColor: states.disabled ? "text-disabled" : states.checked ? "identity-dark" : "black",
                    padding: padding,
                    cursor: "pointer"
                };
            }
        },

        "tabview-page/button/label": {
            alias: "label",

            style: function (states) {
                return {
                    padding: [0, 1, 0, 1],
                    font: "bold"
                };
            }
        },

        /**
         * ---------------------------------------------------------------------------
         * TOOLBAR
         * ---------------------------------------------------------------------------
         */
        "toolbar": {
            style: function (states) {
                return {
                    decorator: "toolbar",
                    padding: [4, 0]
                };
            }
        },

        /**
         * ---------------------------------------------------------------------------
         * TABLE
         * ---------------------------------------------------------------------------
         */
        "cell": {
            style: function (states) {
                return {
                    decorator: states.selected ? "table-row-background-selected" : "table-row-background-even",
                    textColor: states.selected ? "text-selected" : "text",
                    padding: [3, 6]
                }
            }
        },

        /**
         * ---------------------------------------------------------------------------
         * BUTTON
         * ---------------------------------------------------------------------------
         */
        "button-frame/label": {
            alias: "atom/label",

            style: function (states) {
                return {
                    textColor: states.disabled ? "text-disabled" : states.hovered ? "text-hovered" : undefined,
                    font: "bold"
                };
            }
        },


        "waiting": {
            style: function (states) {
                return {
                    icon: "polymita/images/ajax-loader-xabal.gif"
                };
            }
        },
        "waiting/captionbar": {}

    }
});