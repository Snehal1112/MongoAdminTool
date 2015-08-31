Ext.define('Mongo.view.mongo.MainViewPort', {
    extend: 'Ext.container.Viewport',

    xtype: 'mainviewport',

    requires : [
        'Mongo.view.mongo.DBCollectionTreeListViewModel',
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
        items: [{
            xtype: 'treelist',
            reference: 'treelist',
            bind: '{treestoress}'/*,
            micro : {}*/
        }]
    }, {
        region : 'center',
        xtype : 'collectiongrid',
        reference: 'collectionGrid',
        bind : {
            store : '{gridStore}'
        }
    }]
});
