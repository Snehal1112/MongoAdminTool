Ext.define('Mongo.view.mongo.MessageContentPanel', {
	/**
	 * @cfg parent class @link{Ext.window.Window Window} extended.
	 */
	extend : 'Ext.window.Window',

	/**
	 * @cfg Create alias for @link{Mongo.view.mongo.MessageContentPanel MessageContentPanel}
	 */
	alias : 'widget.messagecontentpanel',

	/**
	 * @constructor
	 * @param {Object} config Configuration object
	 */
	constructor : function(config)
	{
		config = config || {};

		Ext.applyIf(config,{
			xtype : 'messagecontentpanel',
			layout : 'fit',
			height: 600,
			width: 400,
			autoShow :true,
			items : {
				xtype : 'textarea',
				editable : false,
				ui: 'textarea',
				value : config.jsonObj
			}
		});
		this.callParent(arguments);
	}
});
