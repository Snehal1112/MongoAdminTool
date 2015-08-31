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
