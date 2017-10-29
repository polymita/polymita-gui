qx.Class.define("polymita.dialog.Logon", {
    type: "singleton",
    extend: polymita.dialog.AbstractDialog,

    // override
    construct: function () {
        this.base(arguments);
        this.set({
            allowClose: false,
            showClose: false,
            contentPadding: [0, 0, 20, 0]
        });

        this.getChildControl('captionbar').setVisibility('hidden')
    },

    members: {
        _createContent: function () {
            // Create form login
            var form = this.__form = new qx.ui.form.Form(),
                username = new qx.ui.form.TextField(),
                password = new qx.ui.form.PasswordField(),
                grafica_login = new qx.ui.basic.Image("polymita/images/grafica_login.png");

            username.set({
                margin: [0, 200],
                required: true,
                placeholder: polymita.I18n.trans("Username")
            });
            password.set({
                margin: [0, 200],
                required: true,
                placeholder: polymita.I18n.trans("Password")
            });

            form.add(username, polymita.I18n.trans("Username"), null, "username");
            form.add(password, polymita.I18n.trans("Password"), null, "password");

            this.getLayout().setAlignX("center");

            this.add(grafica_login);
            this.add(username);
            this.add(password);

            // binding
            var controller = new qx.data.controller.Form(null, form);
            this.__model = controller.createModel();

            if (window.location.href.match(/https:\/\/127.0.0.1:3002/)) {
                this.__model.set({ username: 'dev', password: 'dev' });
            }
        },

        _createButtons: function () {
            var buttonPane = this.base(arguments),
                cL = new qx.ui.command.Command("ENTER"),
                bL = new qx.ui.form.Button(this.tr("Entrar"), "polymita/icon/16/actions/login.png", cL);

            buttonPane.add(bL);
            buttonPane.getLayout().setAlignX("center");

            cL.addListener("execute", function () {
                bL.focus();
                setTimeout(function (vThis) {
                    vThis.onExecuteCommandLogin()
                }, 10, this);
            }, this);

            this.addListener("appear", bL.focus, bL);
            this.bind("enabled", cL, "enabled");
        },

        getNewSecretToken: function (proceed) {
            // Call remote service
            var url = qx.core.Init.getApplication().getServerBaseUrl() + 'login.json',
                xhr = new qx.io.request.Xhr(url, "GET");

            xhr.setRequestHeader("Accept", "application/json");
            xhr.addListenerOnce("success", function (e) {
                proceed.call(this, e.getTarget().getResponse())
            }, this);
            xhr.addListenerOnce("error", this.onError, this);
            xhr.addListenerOnce("statusError", this.onStatusError, this);
            xhr.send();
        },

        /**
         * Encrypt auth credentials.
         *
         * @param data {Object} Credentials hash as {username: '...', password: '...'}
         * @param secret {String} Secret password that will be used to encrypt the credentials
         * @return {Object} Encrypted credentials as {credentials: String}
         *
         * @ignore(CryptoJS.*)
         */
        encryptCredentials: function (data, secret) {
            var encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), secret);
            return { credentials: encrypted.toString() }
        },

        show: function () {
            this.base(arguments);
            this.setEnabled(true);
        },

        /**
         * Send request with username and password to report server to check the authenticity.
         *
         * The response will be processed in the events methods onSuccess, onError or onStatusError.
         */
        onExecuteCommandLogin: function () {
            if (this.__form.validate()) {
                this.getNewSecretToken(function (response) {
                    var data = qx.util.Serializer.toNativeObject(this.__model),
                        url = qx.core.Init.getApplication().getServerBaseUrl() + 'login.json',
                        encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), response.token);

                    // Reset password field.
                    this.__model.set('password', '');

                    // Disable dialog.
                    this.setEnabled(false);

                    // Call remote service
                    var xhr = new qx.io.request.Xhr(url, "POST");
                    xhr.setRequestHeader("Accept", "application/json");
                    xhr.setRequestData({ credentials: encrypted.toString() });

                    // Send cookies in request header
                    try {
                        xhr.getTransport().__nativeXhr.withCredentials = true
                    } catch (e) {
                        console.error(e);
                    }

                    xhr.addListenerOnce("success", this.onSuccess, this);
                    xhr.addListenerOnce("error", this.onError, this);
                    xhr.addListenerOnce("statusError", this.onStatusError, this);
                    xhr.send();
                });
            }
        },

        /**
         * Fired when request completes without error and transport’s status indicates success.
         */
        onSuccess: function (e) {
            var response = e.getTarget().getResponse(),
                session = polymita.request.Session.getInstance();

            session.setProfile(response.item);

            // Close logon dialog
            this.close();

            // Show hints message and update interface for new session.
            q.messaging.emit("Application", "good", this.tr("Successful login"));
            q.messaging.emit("Application", "update-session", { action: "login", profile: response.item });
        },

        /**
         * Fired when request completes without error but erroneous HTTP status.
         */
        onStatusError: function (e) {
            var response = e.getTarget().getResponse(),
                msg;

            if (qx.lang.Type.isString(response)) {
                response = { message: response }
            }

            response.statusCode = response.statusCode || e.getTarget().getStatus();
            msg = response.message || polymita.request.AbstractResource.HttpStatus(response.statusCode);

            // Enable logon dialog and show error hints
            this.setEnabled(true);
            q.messaging.emit("Application", "error", msg);
        },

        /**
         * Fired when request completes with error.
         */
        onError: function (e) {
            // Enable logon dialog and show error hints.
            this.setEnabled(true);
            q.messaging.emit("Application", "error", this.tr("Failed connection with server."));
        }
    }
});
