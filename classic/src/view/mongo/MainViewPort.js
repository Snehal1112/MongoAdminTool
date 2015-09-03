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
            header: {
                items: [{
                    xtype: 'button',
                    text: 'Nav',
                    enableToggle: true,
                    reference: 'navBtn',
                    toggleHandler: 'onToggleNav'
                },{
                    xtype: 'button',
                    text: 'Micro',
                    enableToggle: true,
                    toggleHandler: 'onToggleMicro'
                }]
            },
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
        return{
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
