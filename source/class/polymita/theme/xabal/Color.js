/* ************************************************************************

 Copyright:

 License:

 Authors:

 ************************************************************************ */

qx.Theme.define("polymita.theme.xabal.Color", {
    extend: qx.theme.indigo.Color,

    colors: {
        odd: "#E0F0FA",
        even: "#dbffff",
        info: "#FFFFFF",
        good: "#AAFFAA",
        warn: "#FFFFAA",
        error: "#C00F00",
        tooltip: "#FFFFE1",

        "identity-bright": "#FACDCD",
        "identity-dark": "#A50F05",

        "highlight": "identity-dark",

        "background-selected" : "identity-bright",
        "light-background": "identity-dark",

        "bright-box-start": "identity-bright",
        "bright-box-end": "white",

        "dark-box-start": "identity-dark",
        "dark-box-end": "identity-bright",

        //"button-box-bright": "dark-box-start",
        //"button-box-dark": "dark-box-end",

        "table-focus-indicator" : "identity-dark",
        "table-row-background-selected": "bright-box-start",
        "table-row-background-even" : "white",
        "table-row-background-odd" : "#FCFCFC",
        "table-row-background-focused-selected": "bright-box-start",
        "table-row-selected": "identity-dark",

        "text-hovered": "identity-dark"
    }

});