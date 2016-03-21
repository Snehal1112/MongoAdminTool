Ext.define('Mongo.view.core.Context', {
    extend : 'Mongo.view.core.Plugin',
	/**
	 * The currently active view, this is updated through {@link #setView} and when
	 * this field changes, the {@link #viewchange} event will be fired.
	 * When this context is {@link #stateful stateful}, this option will be
	 * saved in the settings.
	 * @property
	 * @type Mixed
	 */
	current_view : undefined,

	/**
	 * The currently active viewmode, this is updated through {@link #setViewMode}
	 * and when this field changes, the {@link #viewmodechange} event will be fired.
	 * When this context is {@link #stateful stateful}, this option will be
	 * saved in the settings.
	 * @property
	 * @type Mixed
	 */
	current_view_mode : undefined,

	/**
	 * @cfg {Boolean} hasContentPanel Indicates if this context offers a content panel, this panel
	 * will be requested by {@link #createContentPanel} when the {@link main.content} insertion
	 * point is used.
	 */
	hasContentPanel : true,

	/**
	 * @cfg {Boolean} groupViewBtns True if the buttons as returned by {@link #getMainToolbarViewButtons}
	 * should be grouped together into a single {@link Ext.Button} using the {@link Ext.Button#menu} option.
	 * If false, the buttons will be placed side by side in the panel.
	 */
	groupViewBtns : true,

	/**
	 * @constructor
	 * @param {Object} config Configuration object
	 */
	constructor : function(config)
	{
		config = config || {};

		Ext.applyIf(config, {
			stateful : true
		});

		Mongo.view.core.Context.superclass.constructor.call(this, config);

/*		if (this.hasContentPanel === true) {
			this.registerInsertionPoint('main.content', this.createContentPanel, this);
		}*/
	},

	/**
	 * Override this method to return a new instance Ext.Panel. 
	 * This instance will be placed at the center of the screen when the 
	 * context is active.
	 * <p>
	 * The default implementation of getComponents() calls this method to
	 * lazily construct the toolbar.  
	 * @return {Ext.Panel} a new panel instance 
	 */
	createContentPanel : function()
	{
		return undefined;
	},

	/**
	 * Override this method to define buttons in the dropdown list of the VIEW button in the main toolbar.
	 * 
	 * @return {Ext.Component[]} an array of components
	 */
	getMainToolbarViewButtons : function()
	{
		return [];
	},
	/**
	 * Override this method to define buttons in the dropdown list of the Print button in the main toolbar.
	 * 
	 * @return {Ext.Component[]} an array of components
	 */
	getMainToolbarPrintButtons : function()
	{
		return [];
	},

	/**
	 * Produces a bid on a given folder. A negative bid (-1) indicates that this
	 * context cannot display the folder contents. A positive bid (1) indicates that it
	 * can, and a higher bid (>1) can be used to override default context plug-ins.
	 * The context that bids the highest is selected to display a given folder.
	 * @param {Zarafa.hierarchy.data.MAPIFolderRecord} folder to bid on.  
	 * @return {Number} a bid on the folder. 
	 */
	bid : function(folder)
	{
		return -1;
	}
});
