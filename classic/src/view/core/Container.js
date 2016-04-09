Ext.ns('Mongo.view.core');
Ext.define('Mongo.view.core.Container', {
	extend : 'Ext.mixin.Observable',
	/**
	 * List of registered {@link ERP.core.Context context instances}.
	 * @property
	 * @private
	 * @type Array
	 */
	contexts : undefined,

	/**
	 * The Meta Data for all registered {@link #contexts}. This is an array
	 * of {@link ERP.core.ContextMetaData ContextMetaData instances}.
	 * @property
	 * @private
	 * @type Array
	 */
	contextsMetaData : undefined,

	/**
	 * List of registered {@link ERP.core.Plugin plugin instances}
	 * (also includes {@link #contexts}).
	 * @property
	 * @private
	 * @type Array
	 */
	plugins : undefined,

	/**
	 * The Meta Data for all registered {@link #plugins}. This is an array
	 * of {@link ERP.core.PluginMetaData PluginMetaData instances}.
	 * @property
	 * @private
	 * @type Array
	 */
	pluginsMetaData : undefined,

	/**
	 * The Meta Data for all registered {@link ERP.core.ui.widget.Widget widgets}. This is an array
	 * of {@link ERP.core.ui.widget.WidgetMetaData WidgetMetaData instances}.
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
		this.callParent();

		// initialize properties
		this.plugins = [];
		this.pluginsMetaData = [];
		this.contexts = [];
		this.contextsMetaData = [];
		this.widgetsMetaData = [];
	},

	/**
	 * Returns the currently active {@link ERP.core.Context context}.
	 * @return {ERP.core.Context} the currently active context.
	 */
	getCurrentContext : function()
	{
		return this.currentContext || this.getContextByName('default');
	},

	/**
	 * Returns the global {@link ERP.core.Request request} instance.
	 * All server requests should be lodged through this instance.
	 *
	 * @return {ERP.core.Request} the global {@link ERP.core.Request Request} instance.
	 */
	getRequest : function()
	{
		//return this.request || (this.request = new ERP.mail.Request({ url:"ERP.php" }));
	},

	/**
	 * Resturns the applications main toolbar
	 * @return {ERP.core.ui.MainToolbar} then application main tool bar
	 */
	getMainToolbar : function()
	{
		return this.getMainPanel().mainToolbar;
	},

	/**
	 * Returns the application tab panel
	 * @return {ERP.core.ui.ContextContainer} The application tab panel
	 */
	getTabPanel : function()
	{
		return this.getMainPanel().getContentPanel();
	},

	/**
	 * Returns the application content panel
	 * @return {ERP.common.ui.ContextMainPanel} the application content panel.
	 */
	getContentPanel : function()
	{
		return this.getTabPanel().get(0).getActiveItem();
	},

	/**
	 * Returns the context that matches the supplied name.
	 * @param {String} name The name of the context which is requested
	 * @return {ERP.core.Context} matching context or <code>undefined</code> if not found.
	 */
	getContextByName : function(name)
	{
		var contexts = this.getContexts();

		for (var index = 0, len = contexts.length; index < len; index++) {
			if (contexts[index].getName() === name) {
				return contexts[index];
			}
		}

		return undefined;
	},

	/**
	 * Returns the Context Meta Data that matches the supplied name.
	 * @param {String} name The name of the context for which the meta data is requested
	 * @return {ERP.core.ContextMetaData} The Meta Data for the context or <code>undefined</code> if not found.
	 */
	getContextMetaDataByName : function(name)
	{
		var contexts = this.getContextsMetaData();

		for (var index = 0, len = contexts.length; index < len; index++) {
			if (contexts[index].getName() === name) {
				return contexts[index];
			}
		}

		return undefined;
	},

	/**
	 * Returns the plug-in that matches the supplied name.
	 * @param {String} name The name of the plugin which is requested
	 * @return {ERP.core.Plugin} matching plug-in or <code>undefined</code> if not found.
	 */
	getPluginByName : function(name)
	{
		var plugins = this.getPlugins();

		for (var index = 0, len = plugins.length; index < len; index++) {
			if (plugins[index].getName() === name) {
				return plugins[index];
			}
		}

		return undefined;
	},

	/**
	 * Returns the Plugin Meta Data that matches the supplied name.
	 * @param {String} name The name of the plugin for which the meta data is requested
	 * @return {ERP.core.PluginMetaData} The Meta Data for the plugin or <code>undefined</code> if not found.
	 */
	getPluginMetaDataByName : function(name)
	{
		var plugins = this.getPluginsMetaData();

		for (var index = 0, len = plugins.length; index < len; index++) {
			if (plugins[index].getName() === name) {
				return plugins[index];
			}
		}

		return undefined;
	},

	/**
	 * Queries registered plug-ins in for components and returns the gathered results.
	 * @param {String} insertionPoint name of the insertion point
	 * @param {Object} args (optional) optional arguments such as scope
	 * @return {Ext.Component[]} an array of components
	 */
	populateInsertionPoint : function(insertionPoint)
	{
		var plugins = this.getPlugins();
		var items = [];

		// convert arguments object to a real array
		var args = Ext.toArray(arguments);

		for (var i = 0, len = plugins.length; i < len; i++) {
			var plugin = plugins[i];

			var components = plugin.getComponents.apply(plugin, args);

			// FIXME: Why do we need to assign the plugin to the component?
			Ext.each(components, function(component) {
				component.plugin = plugin;
				items.push(component);
			});
		}

		// every plugin will give items in their own array so we need to merge all arrays
		// this will not interfere with objects
		return Ext.flatten(items);
	},

    /**
     * Performs a context switch by switching out the current context and switching in the new one.
     * @param {Zarafa.core.Context} context context to switch to.
     * @param {Zarafa.hierarchy.data.MAPIFolderRecord} folder folder that should be shown by the selected context.
     * @param {Boolean} suspended True if the {@link Zarafa.core.ContextModel model} for the
     * {@link Zarafa.core.Context context} should be enabled {@link Zarafa.core.ContextModel#suspendLoading suspended}.
     * @private
     */
    switchContext : function(context, folder, suspended)
    {
        var oldContext = this.getCurrentContext();

        if (oldContext !== context && this.fireEvent('beforecontextswitch', folder, oldContext, context) !== false) {
/*            if (oldContext) {
                oldContext.disable();

                var oldModel = oldContext.getModel();
                if (oldModel) {
                    oldModel.un('folderchange', this.onContextFolderChange, this);
                }
            }*/

           /* context.enable(folder, suspended);
            var newModel = context.getModel();
            if (newModel) {
                newModel.on('folderchange', this.onContextFolderChange, this);
            }
*/
            this.currentContext = context;

  /*          this.fireEvent('folderselect', folder);*/
            this.fireEvent('contextswitch', folder, oldContext, context);

            // Nothing needs to be done between 'contextswitch' and 'aftercontextswitch',
            // the difference between the two events is that the first one can be used
            // internally for building up the UI, while the latter event is ideal for
            // plugins which want the UI components to be setup correctly.
            this.fireEvent('aftercontextswitch', folder, oldContext, context);
        }
    },

	/**
	 * Registers a Context Meta Data instance with the container.
	 * @param {ERP.core.ContextMetaData} info context to register
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
	 * @param {ERP.core.PluginMetaData} info plugin info to register
	 */
	registerPlugin : function(info)
	{
		this.getPluginsMetaData().push(info);
		if (info.isEnabled()) {
			this.getPlugins().push(info.getInstance());
		}
	},

	/**
	 * Returns an array of all registered {@link ERP.core.Plugin plugins}.
	 * @return {Array} plugins
	 */
	getPlugins : function()
	{
		return this.plugins;
	},

	/**
	 * Returns the Meta Data for {@link #pluginsMetaData all registered} {@link ERP.core.Plugin plugins}.
	 * @return {Array} The plugins meta data
	 */
	getPluginsMetaData : function()
	{
		return this.pluginsMetaData;
	},

	/**
	 * Returns the Meta Data for {@link #contextsMetaData all registered} {@link ERP.core.Context contexts}.
	 * @return {Array} The contexts meta data
	 */
	getContextsMetaData : function()
	{
		return this.contextsMetaData;
	},

	/**
	 * Returns the application main panel.
	 * @return {ERP.core.ui.MainViewport} the application main panel.
	 */
	getMainPanel : function()
	{
		return this.mainPanel || (this.mainPanel = Ext.create({xtype: 'mainviewport'}));
	},

	/**
	 * Returns an array of all registered {@link ERP.core.Context contexts}.
	 * @return {Array} Contexts
	 */
	getContexts : function()
	{
		return this.contexts;
	}
});