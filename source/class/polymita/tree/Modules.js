/**
 * @asset(qx/icon/${qx.icontheme}/16/mimetypes/text-plain.png)
 * @asset(qx/icon/${qx.icontheme}/16/places/folder-open.png)
 * @asset(qx/icon/${qx.icontheme}/16/places/folder.png)
 */
qx.Class.define("polymita.tree.Modules", {
    type: 'singleton',
    extend: qx.ui.treevirtual.TreeVirtual,

    /**
     * Constructor
     */
    construct: function () {
        this.base(arguments, [this.tr("Modules")]);
        this.setRowHeight(22);

        this.loadModules();

        // Not move the focus with the mouse.
        this.setFocusCellOnPointerMove(false);

        // Add Listener events.
        this.addListener('keyup', this.onKeyup, this);
        this.addListener("click", this.onClick, this);

        // Create route handler for messaging channels.
        q.messaging.on("Application", "update-session", this.onUpdateSession, this);
    },

    members: {
        /**
         * Add nodes to tree from given nodes.
         *
         * @param root {Integer?null}
         * @param nodes {Array}
         * @internal
         */
        __addNodes: function (root, nodes) {
            var dataModel = this.getDataModel(),
                node;

            nodes.forEach(function (item) {
                var label = polymita.I18n.trans(item.i18nCatalog, 'Labels', 'MODULE-REFERENCE');

                if (item.children) {
                    node = dataModel.addBranch(root, label, true);
                    this.__addNodes(node, item.children);
                } else {
                    node = dataModel.addLeaf(root, label)
                }
                dataModel.setColumnData(node, 0, item);
            }, this);
        },

        /**
         * Transform list modules into tree modules structure.
         *
         * @param itmes {Array} List of modules.
         * @returns {Array} Tree of modules.
         * @internal
         */
        __listToTree: function (items) {
            var nodes = {},
                rootNodes = [],
                node, children;

            items.forEach(function (node) {
                nodes[node.id] = node;
            });

            while (items.length) {
                node = items.pop();

                if (node.parentId === null || !nodes[node.parentId]) {
                    rootNodes.unshift(node);
                } else {
                    children = nodes[node.parentId].children || [];
                    children.push(node);
                    nodes[node.parentId].children = children;
                }
            }

            return rootNodes;
        },

        loadModules: function () {
            var request = new polymita.request.Modules();

            request.findAll('place', { disabled: false }, function (response) {
                if (response.successful) {
                    // Transform list nodes into tree nodes structure.
                    var nodes = this.__listToTree(response.data);

                    // Add nodes to tree data model.
                    this.__addNodes(null, nodes);
                    this.getDataModel().setData();
                } else {
                    var msg = polymita.I18n.trans('Common', 'Messages', 'FAILED LOAD');
                    q.messaging.emit('Application', 'error', msg);
                }
            }, this);
        },

        /**
         * Connect the text field with the tree filter.
         *
         * @param filterField {polymita.form.field.util.SearchTextField}
         */
        setFilter: function (filterField) {
            filterField.addListener("changeValue", this.onFilterChangeValue, this);

            this.getDataModel().setFilter(function (node) {
                if (node.type == qx.ui.treevirtual.MTreePrimitive.Type.LEAF) {
                    var label = node.label.toUpperCase(),
                        filter = (filterField.getValue() || '').toUpperCase();

                    return label.indexOf(filter) != -1;
                }
                return true;
            });
        },

        /**
         * Fired after session is login or logout.
         *
         * @param data {Object} Message data with response info from login or logout action.
         */
        onUpdateSession: function (data) {
            this.getDataModel().clearData();
            this.loadModules();
        },

        /**
         * Fired after data was loaded.
         *
         * @param e {qx.event.type.Data}
         */
        onStoreLoaded: function (e) {
            var nodes = qx.util.Serializer.toNativeObject(e.getData());

            this.__addNodes(null, nodes);
            this.getDataModel().setData();
        },

        /**
         * This event if fired if a keyboard key is released.
         *
         * @param e {qx.event.type.KeySequence} Keypress event.
         */
        onKeyup: function (e) {
            var keyCode = e.getKeyCode(),
                nodes = this.getSelectedNodes();

            if (nodes.length == 1 && (keyCode == 13 || keyCode == 32)) {
                q.messaging.emit("Application", "open-module", nodes[0].columnData[0]);
            }
        },

        /**
         * Widget is clicked using left or middle button.
         *
         * @param e {qx.event.type.Mouse}
         */
        onClick: function (e) {
            q.messaging.emit("Application", "open-module", this.getSelectedNodes()[0].columnData[0]);
        },

        /**
         * Fired when the filter field change.
         *
         * @param e {qx.event.type.Data}
         */
        onFilterChangeValue: function (e) {
            this.getDataModel().setData();
        }
    }
});
