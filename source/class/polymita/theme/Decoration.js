/* ************************************************************************

 Copyright:

 License:

 Authors:

 ************************************************************************ */

qx.Theme.define("polymita.theme.Decoration", {
    extend: qx.theme.indigo.Decoration,

    decorations: {
        "app-footer": {
            style: {
                gradientStart: ["highlight", 0],
                gradientEnd: ["#323335", 100]
            }
        },

        "app-header": {
            style: {
                innerWidthBottom: 1,
                innerColorBottom: "black",
                widthBottom: 2,
                colorBottom: "highlight",

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

        "calendar-day": {
            style: {
                width: 1,
                color: "highlight",
                radius: 5,

                gradientStart: ["#cccccc", 0],
                gradientEnd: ["#ffffff", 100],

                backgroundColor: "#ffffff"
            }
        },

        "content-box-odd": {
            include: "tooltip",
            style: {
                gradientStart: ["odd", -50],
                gradientEnd: ["#FFFFFF", 100]
            }
        },

        "content-box-even": {
            include: "window",
            style: {
                gradientStart: ["even", -50],
                gradientEnd: ["#FFFFFF", 100]
            }
        },

        "global-search-text-field-inset": {
            include: "inset",
            style: {
                backgroundColor: "red",
                color: "white",
                radius: 5
            }
        },

        "global-search-text-field-focused-inset": {
            include: "focused-inset",
            style: {
                backgroundColor: "white",
                radius: 5
            }
        },

        "polymita-management": {},
        "polymita-data-grid": {},
        "polymita-property-grid": {},

        "none": {}
    }
});