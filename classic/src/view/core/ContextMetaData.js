/**
 * @class Zarafa.core.ContextMetaData
 * @extends Zarafa.core.PluginMetaData
 *
 * The Meta Data object containing the registration details
 * of a {@link Zarafa.core.Context}. An instance of this object
 * must be passed to {@link Zarafa.core.Container#registerContext}.
 */
Ext.ns('Mongo.view.core');
Ext.define('Mongo.view.core.ContextMetaData', {
    extend : 'Mongo.view.core.PluginMetaData',
	/**
	 * @constructor
	 * @param {Object} config Configuration object
	 */
	constructor : function(config)
	{
		config = config || {};

		Ext.applyIf(config, {
			// By default Contexts cannot be disabled
			allowUserDisable : false
		});
		
		this.callParent(arguments);

		//Mongo.view.core.ContextMetaData.superclass.constructor.call(this, config);
	}
});
