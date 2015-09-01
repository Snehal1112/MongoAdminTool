Ext.define('Mongo.view.mongo.CollectionGrid', {
	/**
	 * 
	 */
	extend: 'Ext.tree.Panel',

	/**
	 * 
	 */
	alias : 'widget.collectiongrid',

	/**
	 * 
	 */
	requires : [
		'Mongo.model.Role'
	],

	emptyText : 'There are no items to show in this view',

	/**
	 * 
	 */
	constructor : function(config)
	{
		config = config || {};

		Ext.applyIf(config,{
			forceFit : true,
			useArrows: true,
			rootVisible: false,
			multiSelect: true,
			singleExpand: true
		});
		this.callParent(arguments);
	},

	/**
	 * Function 
	 */
	initComponent : function()
	{
		Ext.apply(this, {
			columns: [{
				xtype: 'treecolumn',
				text: 'Keys',
				/*iconCls : 'x-tree-icon x-fa fa-envelope',*/
				dataIndex: 'key'
			},{
				text: 'Fields',
				dataIndex: 'field'
			},{
				text: 'Type',
				dataIndex: 'type'
			}]
		});
		this.callParent();
	}
});
