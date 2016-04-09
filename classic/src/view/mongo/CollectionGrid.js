Ext.ns('Mongo.view.mongo');
Ext.define('Mongo.view.mongo.CollectionGrid', {
	/**
	 * @cfg parent class @link{Ext.tree.Panel TreePanel} extended.
	 */
	extend : 'Ext.tree.Panel',

	/**
	 * @cfg Create alias for @link{Mongo.view.mongo.CollectionGrid CollectionGrid}
	 */
	alias : 'widget.collectiongrid',

	/**
	 * @cfg List of classes that have to be loaded before instantiating this class.
	 */
	requires : [
		'Mongo.view.mongo.DBCollectionTreeListViewModel',
		'Mongo.store.mongo.DocumentStore',
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
			forceFit : true,
			useArrows: true,
			rootVisible: false,
			multiSelect: true,
			emptyText : 'There are no items to show in this view',
			singleExpand: true,
			dockedItems: [{
				xtype: 'pagingtoolbar',
				store: 'documentStore',
				dock: 'bottom',
				displayInfo: true
			}]
		});
		this.callParent(arguments);
	},

	/**
	 * Function was called at the time of component initialization time.
	 *
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

	/**
	 * Initialize the events.
	 */
	initEvents : function()
	{
		this.on('rowcontextmenu', this.onItemContextMenu, this);
		this.callParent(arguments)
	},

	/**
	 * Event handler which triggered when right click on any grid item.
	 * also function shows the context menu on grid.
	 */
	onItemContextMenu : function(view, record, item, index, e, eOpts)
	{
		e.preventDefault();
		Ext.create('Ext.menu.Menu', {
			items: [{
				text: 'Open',
				records : view.getSelection(),
				iconCls : 'fa fa-folder-open',
				listeners : {
					click : 'onOpenClick'
				}
			},{
				text: 'Update',
				iconCls : 'x-fa fa-edit'
			},{
				text: 'Delete',
				iconCls : 'x-fa fa-trash',
				records : view.getSelection(),
				listeners : {
					click : 'onDeleteClick'
				}
			}]
		}).showAt(e.getXY());
	}
});
