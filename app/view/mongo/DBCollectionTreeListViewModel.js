Ext.define('Mongo.view.mongo.DBCollectionTreeListViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.tree-list',

    formulas: {
        selectionText: function(get) {
            console.log('Grid panel');
            var selection = get('treelist.selection'),
                path;
            if (selection) {
                path = selection.getPath('text');
                path = path.replace(/^\/Root/, '');
                return 'Selected: ' + path;
            } else {
                return 'No node selected';
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
            proxy: {
                type : 'request',
                moduleName : 'authenticate',
                action : 'list'
            },
            model : 'Mongo.model.Role'
            /*autoLoad : true*/
        }
    }
});