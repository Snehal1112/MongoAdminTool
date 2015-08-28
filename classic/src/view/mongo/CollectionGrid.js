Ext.define('Mongo.view.mongo.CollectionGrid', {
    extend: 'Ext.grid.Panel',
    alias : 'widget.collectiongrid',
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
    constructor : function(config)
    {
		config = config || {};
		
    	this.tpl = new Ext.XTemplate(
		'<tpl foreach=".">',
			'<div><b>{$} : </b>{.}</div>',
		'</tpl>');
		Ext.applyIf(config,{
			forceFit : true,
			plugins: [{
				ptype: 'cellediting',
				clicksToEdit: 1
			}],
    		columns: [],
    		store : new Ext.data.JsonStore({
    			proxy: {
	                type : 'request',
	                moduleName : 'authenticate',
	                action : 'list'
	            },
	            model : 'Mongo.model.Role',
	            autoLoad : true
        	})
    	});

    	this.callParent(arguments);
    },

	/**
     * 
     */
	initComponent : function()
	{
		this.callParent(arguments);
		this.mon(this.store, 'metachange', this.onMetaChange, this);
	},

	onMetaChange : function(store, meta)
	{
		this.reconfigure(store, meta.colModel);
	}
});
