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
		'Mongo.view.mongo.DBCollectionTreeListViewModel',
		'Mongo.store.mongo.DocumentStore',
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
			singleExpand: true,
			dockedItems: [{
				xtype: 'pagingtoolbar',
				store: 'simpsonsStore',
				dock: 'bottom',
				displayInfo: true
			}]
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
	},

	initEvents : function()
	{
		this.on('rowcontextmenu', this.onItemContextMenu, this);
		this.callParent(arguments)
	},

	onItemContextMenu : function(view, record, item, index, e, eOpts)
	{
		e.preventDefault();
		
	}
});
