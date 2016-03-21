Ext.ns('Mongo.view.mongo');
Ext.define('Mongo.view.mongo.MainViewPort', {
    extend: 'Ext.container.Viewport',

    /**
     * 
     */
    xtype: 'mainviewport',
    alias: 'widget.mainviewport',

    /**
     * 
     */
    requires : [
        'Mongo.view.mongo.DBCollectionTreeListViewController',
        'Mongo.view.mongo.DBCollectionTreeListViewModel',
        'Mongo.view.mongo.Request',
        'Mongo.view.mongo.MailContext',
        'Mongo.view.core.Container',
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
            autoRender : true,
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
            split: true,
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
            tools: [{
                type: 'left',
                callback: 'onToggleMicro'
            }]
           /* header: {
                items: [{
                    xtype: 'button',
                    text: 'Micro',
                    enableToggle: true,
                    toggleHandler: 'onToggleMicro'
                }]
            }*/
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
