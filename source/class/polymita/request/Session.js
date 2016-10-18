qx.Class.define("polymita.request.Session", {
    type: "singleton",
    extend: qx.core.Object,
    include: [qx.locale.MTranslation],

    // override
    construct: function () {
        this.base(arguments);

        // Create route handler for messaging channels.
        q.messaging.on("Application", "logout", this.logout, this);
        q.messaging.on("Application", "login", this.login, this);
    },

    properties: {
        logoutUrl: {
            init: "logout"
        },

        logoutMethod: {
            init: "GET"
        }
    },

    members: {

        /**
         * Clear authenticity profile and open login dialog.
         */
        login: function () {
            this.setProfile(null);
            polymita.dialog.Logon.getInstance().show();
        },

        /**
         * Send request to report server to check the authenticity
         * for release active authenticity token.
         *
         * The response will be processed in the events methods onSuccess or onError.
         */
        logout: function () {
            // Call remote service
            var url = qx.core.Init.getApplication().getServerBaseUrl() + 'logout.json',
                xhr = new qx.io.request.Xhr(url, 'GET');

            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestData({ format: "json" });

            // Send cookies in request header
            try {
                xhr.getTransport().__nativeXhr.withCredentials = true
            } catch (e) {
                console.error(e);
            }

            xhr.addListenerOnce("success", this.onLogoutSuccess, this);
            xhr.addListenerOnce("error", this.onLogoutError, this);
            xhr.addListenerOnce("statusError", this.onLogoutStatusError, this);

            xhr.send();
        },

        isAuthenticated: function () {
            return this.getProfile() != null;
        },

        setProfile: function (value) {
            if (value == null) {
                // Clean local session.
                qx.module.Storage.clearSession();
            } else {
                qx.module.Storage.setSessionItem('profile', value);
            }
        },

        getProfile: function () {
            return qx.module.Storage.getSessionItem('profile');
        },

        /**
         * Fired when request completes without error and transport’s status indicates success.
         */
        onLogoutSuccess: function (e) {
            // Delete the local registry of the current authenticity profile.
            this.setProfile(null);

            // Checking response
            var response = e.getTarget().getResponse();
            q.messaging.emit("Application", "good", this.tr("Successful logout"));
            q.messaging.emit("Application", "update-session", { action: "logout", response: response });
        },

        /**
         * Fired when request completes without error but erroneous HTTP status.
         */
        onLogoutStatusError: function (e) {
            // Delete the local registry of the current authenticity profile.
            this.setProfile(null);

            var response = e.getTarget().getResponse(),
                status = response.statusCode || e.getTarget().getStatus(),
                msg = response.error.message
                    || response.message
                    || polymita.request.AbstractResource.HttpStatus(status);

            q.messaging.emit("Application", "error", msg);
        },

        /**
         * Process the failed response from login or requests.
         */
        onLogoutError: function (e) {
            // Delete the local registry of the current authenticity profile.
            this.setProfile(null);
            q.messaging.emit("Application", "error", this.tr("Failed connection with server."));
        }
    }
});
