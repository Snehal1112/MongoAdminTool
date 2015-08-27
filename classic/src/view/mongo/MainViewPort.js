Ext.define('Mongo.view.mongo.MainViewPort', {
    extend: 'Ext.container.Viewport',

    xtype: 'mainviewport',

    requires : [
        'Mongo.view.mongo.DBCollectionTreeListViewModel',
        'Mongo.store.mongo.DBCollectionStore',
        'Mongo.view.mongo.Request',
        'Mongo.model.Role'
    ],
    controller: 'tree-list',
    viewModel: {
        type: 'tree-list'
    },
    layout : 'border',
    items: [{
        region: 'west',
        split: true,
        reference: 'treelistContainer',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        border: false,
        scrollable: 'y',
        items: [{
            xtype: 'treelist',
            reference: 'treelist',
            bind: '{treestoress}'
            /*micro : {}*/
        }],
        listeners : {
            afterrender : function()
            {
                console.log('Tree Load');
            }
        }
    }, {
        region: 'center',
        xtype : 'collectiongrid',
        bind: '{gridStore}',
    }]
});
