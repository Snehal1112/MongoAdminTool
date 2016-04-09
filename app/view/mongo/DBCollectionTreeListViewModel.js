Ext.define('Mongo.view.mongo.DBCollectionTreeListViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.tree-list',

    formulas: {
        sdText: function(get) {
            var selection = get('treelist.selection'),path;
            if (selection) {
                var selectedNode = selection.getQueryRoot();
                var parentNode = selectedNode.parentNode;
                var dbPath;
                if(!parentNode.isRoot()) {
                    var store = this.getData().documentStore;
                    store.setDatabase(parentNode.get('text'));
                    store.setCollection(selectedNode.get('text'));
                    var options = {};
                    options.params = {}; 
                    Ext.apply(options['params'], {
                        'database' : parentNode.get('text'),
                        'collection' : selectedNode.get('text')
                    });

                    store.load(options);
                    return Ext.String.capitalize(parentNode.get('text')) + " > "+ Ext.String.capitalize(selectedNode.get('text'));
                }
                return Ext.String.capitalize(selectedNode.get('text'));
            }
            return 'MongoDB Document';
        }
    },

    /**
     * List of stores which used to load the data at respective components.
     */
    stores: {
        /**
         * Tree store which load the hierarchy of database and collections of mongodb.
         */
        treestores: {
            type : 'tree',
            root: {
                expanded: true
            },
            proxy: {
                type : 'request',
                moduleName : 'hierarchy',
                action : 'list'
            },
            folderSort: true,
            sorters: [{
                property: 'text',
                direction: 'ASC'
            }]
        },

        /**
         * Store which contains the all the collection of document.
         */
        documentStore :{
            type : 'documentstore'
        }
    }
});