qx.Class.define("polymita.ToolTip", {
    type: "singleton",
    extend: qx.core.Object,

    statics: {
        create: function (msg, icon, bgColor, textColor) {
            var application = qx.core.Init.getApplication(),
                placeWidget = application.getToolTioPlaceToWidget(),
                applicationWidth = application.getRoot().getLayout().getSizeHint().width,
                offsetTop = 0;

            if (!this.lastToolTip) {
                this.lastToolTip = new qx.ui.tooltip.ToolTip();
                this.lastToolTip.addListener("changeVisibility", this.onChangeVisibility, this);
            } else if (this.lastToolTip.isVisible()) {
                var lastToolTipBounds = this.lastToolTip.getBounds(),
                    placeWidgetBounds = placeWidget.getBounds();

                if (!lastToolTipBounds) {
                    // Wait to render last ToolTip before show next ToolTip.
                    setTimeout(qx.lang.Function.bind(this.create, this), 5, msg, icon, bgColor, textColor);
                    return;
                }

                offsetTop = lastToolTipBounds.top + lastToolTipBounds.height - placeWidgetBounds.height;
                this.lastToolTip = new qx.ui.tooltip.ToolTip();
                this.lastToolTip.addListener("changeVisibility", this.onChangeVisibility, this);
            } else {
                offsetTop = 0;
            }

            this.lastToolTip.set({
                position: "top-right",
                offsetRight: 5,
                offsetTop: offsetTop,
                rich: true,
                label: msg,
                icon: icon,
                textColor: textColor,
                backgroundColor: bgColor,
                maxWidth: Math.trunc(applicationWidth / 4)
            });

            this.lastToolTip.placeToWidget(placeWidget);
            this.lastToolTip.show();
        },

        onChangeVisibility: function (e) {
            var toolTip = e.getTarget();

            if (!toolTip.isVisible()) {
                if (toolTip == this.lastToolTip) {
                    this.lastToolTip = null;
                }
                toolTip.destroy();
            }
        },

        info: function (msg) {
            this.create(msg, 'polymita/icon/32/info.png', 'info', 'black');
            console.info(msg);
        },

        good: function (msg) {
            this.create(msg, 'polymita/icon/32/good.png', 'good', 'black');
            console.log(msg);
        },

        warn: function (msg) {
            this.create(msg, 'polymita/icon/32/warn.png', 'warn', 'black');
            console.warn(msg);
        },

        error: function (msg) {
            this.create(msg, 'polymita/icon/32/error.png', 'error', 'white');
            console.error(msg);
        }
    }
});
