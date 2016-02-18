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
        'Mongo.view.mongo.DBCollectionTreeListViewController',
        'Mongo.view.mongo.DBCollectionTreeListViewModel',
        'Mongo.view.mongo.Request',
        'Mongo.model.Role'
    ],

    /**
     * @constructor
     * @param {Object} config Configuration object
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
            items: [
                this.createDatabaseHierarchy(),
                this.createCollectionPanel()
            ]
        });
        this.callParent(arguments);
    },

    /**
     * Function which create the @link{Mongo.view.mongo.CollectionGrid CollectionGrid}
     * @return {Object} component object.
     */
    createDatabaseHierarchy : function()
    {
        return {
            region: 'west',
            title : 'MongoDB Databases',
            split: true,
            //iconCls : 'x-fa fa-mongodb',
            iconCls: 'fa fa-home fa-lg',
            reference: 'treelistContainer',
            cls : 'treelist-with-nav',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            border: false,
            scrollable: 'y',
            items: [{
                xtype: 'dbtreelist',
                reference: 'treelist',
                ui : 'nav'
            }],
            bbar : [{
                xtype : 'button',
                text : '<<',
                width : 44,
                handler : 'onButtonClick'
            }]
        }
    },

    /**
     * Function which create the @link{Mongo.view.mongo.CollectionGrid CollectionGrid}
     * @return {Object} component object.
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
                store : '{documentStore}'
            }
        }
    }
});
