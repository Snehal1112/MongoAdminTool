Ext.ns('Mongo.view.core');
Ext.define('Mongo.view.core.Container', {
    extend : 'Ext.util.Observable',
    	/**
	 * List of registered {@link Zarafa.core.Context context instances}.
	 * @property
	 * @private
	 * @type Array
	 */
	contexts : undefined,

	/**
	 * The Meta Data for all registered {@link #contexts}. This is an array
	 * of {@link Zarafa.core.ContextMetaData ContextMetaData instances}.
	 * @property
	 * @private
	 * @type Array
	 */
	contextsMetaData : undefined,

	/**
	 * List of registered {@link Zarafa.core.Plugin plugin instances}
	 * (also includes {@link #contexts}).
	 * @property
	 * @private
	 * @type Array
	 */
	plugins : undefined,

	/**
	 * The Meta Data for all registered {@link #plugins}. This is an array
	 * of {@link Zarafa.core.PluginMetaData PluginMetaData instances}.
	 * @property
	 * @private
	 * @type Array
	 */
	pluginsMetaData : undefined,

	/**
	 * The Meta Data for all registered {@link Zarafa.core.ui.widget.Widget widgets}. This is an array
	 * of {@link Zarafa.core.ui.widget.WidgetMetaData WidgetMetaData instances}.
	 * @property
	 * @private
	 * @type Array
	 */
	widgetsMetaData : undefined,

	/**
	 * @constructor
	 */
	constructor : function()
	{
		Mongo.view.core.Container.superclass.constructor.call(this);

		// initialize properties
		this.plugins = [];
		this.pluginsMetaData = [];
		this.contexts = [];
		this.contextsMetaData = [];
		this.widgetsMetaData = [];
	},

	/**
	 * Registers a Context Meta Data instance with the container.
	 * @param {Zarafa.core.ContextMetaData} info context to register
	 */
	registerContext : function(info)
	{
		this.getContextsMetaData().push(info);
		if (info.isEnabled()) {
			this.getContexts().push(info.getInstance());
		}

		// A Context is also a plugin, so register it
		// as such as well.
		this.registerPlugin(info);
	},

	/**
	 * Registers a Plugin Meta Data instance with the container.
	 * @param {Zarafa.core.PluginMetaData} info plugin info to register
	 */
	registerPlugin : function(info)
	{
		this.getPluginsMetaData().push(info);
		if (info.isEnabled()) {
			this.getPlugins().push(info.getInstance());
		}
	},

	/**
	 * Returns an array of all registered {@link Zarafa.core.Plugin plugins}.
	 * @return {Array} plugins
	 */
	getPlugins : function()
	{
		return this.plugins;
	},

	/**
	 * Returns the Meta Data for {@link #pluginsMetaData all registered} {@link Zarafa.core.Plugin plugins}.
	 * @return {Array} The plugins meta data
	 */
	getPluginsMetaData : function()
	{
		return this.pluginsMetaData;
	},

	/**
	 * Returns the Meta Data for {@link #contextsMetaData all registered} {@link Zarafa.core.Context contexts}.
	 * @return {Array} The contexts meta data
	 */
	getContextsMetaData : function()
	{
		return this.contextsMetaData;
	},

	/**
	 * Returns the application main panel.
	 * @return {Zarafa.core.ui.MainViewport} the application main panel.
	 */
	getMainPanel : function()
	{
		return this.mainPanel || (this.mainPanel = Ext.create({xtype: 'mainviewport'}));
	},

	/**
	 * Returns an array of all registered {@link Zarafa.core.Context contexts}.
	 * @return {Array} Contexts
	 */
	getContexts : function()
	{
		return this.contexts;
	}
});