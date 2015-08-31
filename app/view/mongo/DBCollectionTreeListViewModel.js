Ext.define('Mongo.view.mongo.DBCollectionTreeListViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.tree-list',

    formulas: {
        sdText: function(get) {
            var selection = get('treelist.selection'),
                path;
            if (selection) {
                var selectedNode = selection.getQueryRoot();
                var parentNode = selectedNode.parentNode;
                if(!parentNode.isRoot()) {
                    var options = {};
                    options['params'] = {};
                    options['params']['database'] = parentNode.get('text');
                    options['params']['collection'] = selectedNode.get('text');
                   this.getData().gridStore.load(options);
                }
            }
        }
    },

    /**
     * 
     */
    stores: {
        treestoress: {
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
        gridStore :{
            type : 'tree',
            root: {
                expanded: true
            },
            proxy: {
                type : 'request',
                moduleName : 'authenticate',
                action : 'list'
            }
        }
    }
});