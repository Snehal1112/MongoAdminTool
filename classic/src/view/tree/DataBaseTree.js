Ext.define('Mongo.view.tree.DatabaseTree', {
	/**
	 * 
	 */
	extend: 'Ext.list.Tree',

	/**
	 * 
	 */
	alias : 'widget.dbtreelist',
	/**
	 * 
	 */
	constructor : function(config)
	{
		config = config || {};

		Ext.applyIf(config,{
			requires : [
				'Mongo.view.mongo.DBCollectionTreeListViewModel',
				'Mongo.view.mongo.DBCollectionTreeListViewController',
				'Mongo.view.mongo.Request',
				'Mongo.model.Role'
			],
			
			emptyText : 'There are no items to show in this view',
			reference: 'dbTreeList',
			expanderFirst : false,
			bind: '{treestores}'
		});
		this.callParent(arguments);
	},

	/**
	 * 
	 */
	initEvents : function()
	{
		this.on('rowcontextmenu', this.onItemContextMenu, this);
		this.callParent(arguments)
	},

	/**
	 * 
	 */
	onItemContextMenu : function(view, record, item, index, e, eOpts)
	{
		console.log(record);
	}
});
