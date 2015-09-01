Ext.define('Mongo.view.mongo.MainViewPort', {
    extend: 'Ext.container.Viewport',

    /**
     * 
     */
    xtype: 'mainviewport',

    /**
     * 
     */
    constructor : function(config)
    {
        config = config || {};
        Ext.applyIf(config,{
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
                title : 'MongoDB Databases',
                split: true,
                reference: 'treelistContainer',
                collapsible: true,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                border: false,
                items: [{
                    xtype: 'dbtreelist'
                }]
            },{
                region : 'center',
                xtype : 'collectiongrid',
                reference: 'collectionGrid',
                bind : {
                    store : '{gridStore}'
                }
            }]
        });
        this.callParent(arguments);
        console.log(Mongo);
    }
});
