Ext.define('Mongo.view.mongo.DBCollectionTreeListViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.tree-list',

    formulas: {
        sdText: function(get) {
            var selection = get('dbTreeList.selection'),
                path;
            if (selection) {
                var selectedNode = selection.getQueryRoot();
                var parentNode = selectedNode.parentNode;
                if(!parentNode.isRoot()) {
                    var store = this.getData().gridStore;
                    store.setDatabase(parentNode.get('text'));
                    store.setCollection(selectedNode.get('text'));
                    store.load();
                    return Ext.String.capitalize(selectedNode.get('text'));
                }
            }
            return 'MongoDB Document';
        }
    },

    /**
     * 
     */
    stores: {
        /**
         * 
         */
        treestores: {
            type : 'tree',
            root: {
                expanded: true
            },
            proxy: {
                type : 'request',
                moduleName : 'authenticate',
                action : 'treelist'
            },
            folderSort: true,
            sorters: [{
                property: 'text',
                direction: 'ASC'
            }]
        },

        /**
         * 
         */
        gridStore :{
            type : 'documentstore'
        }
    }
});