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
        'Mongo.model.Role',
        'Ext.ux.layout.ResponsiveColumn'
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
                this.createCollectionPanel(),
                this.createNavigationToolbar()
            ]
        });
        this.callParent(arguments);
    },

    /**
     * 
     */
    createNavigationToolbar : function()
    {
        return {
            xtype: 'toolbar',
            region : 'north',
            cls: 'sencha-dash-dash-headerbar toolbar-btn-shadow shadow-panel',
            height: 64,
            itemId: 'headerBar',
            items: [{
                    xtype: 'component',
                    reference: 'senchaLogo',
                    cls: 'sencha-logo',
                    html: '<div class="main-logo">Helios</div>',
                    width: 164
                },
                {
                    margin: '0 0 0 8',
                    cls: 'delete-focus-bg',
                    iconCls:'x-fa fa-navicon',
                    id: 'main-navigation-btn',
                    handler: 'onToggleMicro'
                },
                {
                    xtype: 'tbspacer',
                    flex: 1
                },
                {
                    cls: 'delete-focus-bg',
                    iconCls:'x-fa fa-search',
                    href: '#search',
                    hrefTarget: '_self',
                    tooltip: 'See latest search'
                },
                {
                    cls: 'delete-focus-bg',
                    iconCls:'x-fa fa-envelope',
                    href: '#email',
                    hrefTarget: '_self',
                    tooltip: 'Check your email'
                },
                {
                    cls: 'delete-focus-bg',
                    iconCls:'x-fa fa-bell'
                },
                {
                    cls: 'delete-focus-bg',
                    iconCls:'x-fa fa-th-large',
                    href: '#profile',
                    hrefTarget: '_self',
                    tooltip: 'See your profile'
                },
                {
                    xtype: 'tbtext',
                    text: 'Goff Smith',
                    cls: 'top-user-name'
                }
            ]
        }
    },


    /**
     * Function which create the @link{Mongo.view.mongo.CollectionGrid CollectionGrid}
     * @return {Object} component object.
     */
    createDatabaseHierarchy : function()
    {
        return {
            region: 'west',
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
            margin : '10 10 10 10',
            xtype : 'collectiongrid',
            cls: 'shadow-panel',
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
