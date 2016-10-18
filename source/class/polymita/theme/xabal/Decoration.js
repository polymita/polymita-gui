/* ************************************************************************

 Copyright:

 License:

 Authors:

 ************************************************************************ */

qx.Theme.define("polymita.theme.xabal.Decoration", {
    extend: qx.theme.indigo.Decoration,

    decorations: {
        "app-footer": {
            style: {
                gradientStart: ["bright-box-start", 0],
                gradientEnd: ["dark-box-start", 100]
            }
        },

        "app-header": {
            style: {
                innerWidthBottom: 1,
                innerColorBottom: "black",
                widthBottom: 2,
                colorBottom: "identity-dark",

                gradientStart: ["white", 0],
                gradientEnd: ["#dedede", 100]
            }
        },

        "tooltip": {
            style: {
                radius: 5,
                width: 1,
                color: "black"
            }
        },

        "polymita-management": {},
        "polymita-data-grid": {},
        "polymita-property-grid": {},

        /**
         * ---------------------------------------------------------------------------
         * TAB VIEW
         * ---------------------------------------------------------------------------
         */
        "tabview-page-button-top": {
            style: {
                width: [1, 1, 0, 1],
                color: "border-main",
                radius: [3, 3, 0, 0],
                gradientStart: ["bright-box-start", 0],
                gradientEnd: ["bright-box-end", 100],
                widthBottom: 2,
                colorBottom: "gray"
            }
        },

        "tabview-page-button-top-active": {
            include: "tabview-page-button-top",
            style: {
                gradientStart: ["bright-box-end", 100],
                color: "border-main",
                colorBottom: "identity-dark"
            }
        },

        /**
         * ---------------------------------------------------------------------------
         * TOOLBAR
         * ---------------------------------------------------------------------------
         */
        "toolbar": {
            style: {
                gradientStart: ["bright-box-start", 10],
                gradientEnd: ["bright-box-end", 90]
            }
        },

        /**
         * ---------------------------------------------------------------------------
         * BUTTON
         * ---------------------------------------------------------------------------
         */
        "button-box-pressed": {
            include: "button-box",

            style: {
                color: "identity-dark"
            }
        },

        "button-box-hovered": {
            include: "button-box",

            style: {
                color: "button-border-hovered"
            }
        },

        "button-box-focused": {
            include: "button-box",

            style: {
                color: "identity-dark"
            }
        },

        /**
         * ---------------------------------------------------------------------------
         * TABLE
         * ---------------------------------------------------------------------------
         */
        "statusbar": {
            style: {
                widthTop: 1,
                colorTop: "border-main",
                styleTop: "solid",
                gradientStart: ["bright-box-end", 0],
                gradientEnd: ["bright-box-start", 100]
            }
        },

        "table-header": {
            include: "button-box",

            style: {
                radius: 0,
                gradientStart: ["bright-box-start", 10],
                gradientEnd: ["bright-box-end", 90]
            }
        },

        /*
         ---------------------------------------------------------------------------
         SCROLL KNOB
         ---------------------------------------------------------------------------
         */
        "scroll-knob": {
            style: {
                radius: 3,
                width: 1,
                color: "button-border",
                gradientStart: ["bright-box-start", 10],
                gradientEnd: ["bright-box-end", 90]
            }
        },

        "scroll-knob-pressed": {
            include: "scroll-knob",

            style: {
                gradientStart: ["dark-box-start", 10],
                gradientEnd: ["dark-box-end", 90]
            }
        }
    }
});