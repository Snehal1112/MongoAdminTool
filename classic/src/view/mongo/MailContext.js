Ext.ns('Mongo.view.mongo');
Ext.define('Mongo.view.mongo.MailContext', {
	/**
	 * 
	 */
	extend : 'Mongo.view.core.Context',

	/**
	 * 
	 */
	requires :[
		'Mongo.view.core.Container', 
		'Mongo.view.mongo.DBCollectionTreeListViewModel',
		'Mongo.view.mongo.CollectionGrid'
	],

	/**
	 * 
	 */
	config: {
		name: ''
	},
	
	/**
	 * 
	 */
	constructor: function (config)
	{
		this.callParent(arguments);
	},
	
	/**
	 * 
	 */
	createContentPanel : function()
	{
		return {
			xtype : 'collectiongrid',
			cls: 'shadow-panel',
			title : {
				bind :{
					text : '{sdText}'
				}
			},
			bind : {
				store : '{documentStore}'
			},
			context : this
		};
	}
});

Mongo.onReady(function(){
	container.registerContext(new Mongo.view.core.ContextMetaData({
		name : 'mail',
		displayName: 'Mail',
		allowUserVisible : false,
		pluginConstructor : Mongo.view.mongo.MailContext
	}));
});