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
				'Mongo.view.mongo.Request',
				'Mongo.model.Role'
			],
			emptyText : 'There are no items to show in this view',
			reference: 'dbTreeList',
			expanderFirst : true,
			bind: '{treestores}'
		});
		this.callParent(arguments);
	}
});
