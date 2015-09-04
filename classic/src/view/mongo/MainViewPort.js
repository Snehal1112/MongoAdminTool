Ext.define('Mongo.view.mongo.MainViewPort', {
    extend: 'Ext.container.Viewport',

    /**
     * 
     */
    xtype: 'mainviewport',

    /**
     * 
     */
    requires : [
        'Mongo.view.mongo.DBCollectionTreeListViewModel',
        'Mongo.view.mongo.Request',
        'Mongo.model.Role'
    ],
    /**
     * 
     */
    constructor : function(config)
    {
        config = config || {};
        Ext.applyIf(config,{
            controller: 'tree-list',
            viewModel: {
                type: 'tree-list'
            },
            layout : 'border',
            title : ''
            items: [
                this.createDatabaseHierarchy(),
                this.createCollectionPanel()
            ]
        });
        this.callParent(arguments);
    },

    /**
     * 
     */
    createDatabaseHierarchy : function()
    {
        return {
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
        }
    },

    /**
     * 
     */
    createCollectionPanel : function()
    {
        return {
            region : 'center',
            xtype : 'collectiongrid',
            title : {
                bind :{
                    text : '{sdText}'
                }
            },
            bind : {
                store : '{gridStore}'
            }
        }
    }
});
