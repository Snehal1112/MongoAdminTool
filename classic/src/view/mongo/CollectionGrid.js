Ext.define('Mongo.view.mongo.CollectionGrid', {
    extend: 'Ext.tree.Panel',
    alias : 'widget.collectiongrid',
    requires : [
        /*'Mongo.view.mongo.DBCollectionTreeListViewModel',*/
        'Mongo.view.mongo.Request',
        'Mongo.model.Role'
    ],
    controller: 'tree-list',
    viewModel: {
        type: 'tree-list'
    },
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
     * 
     */
	initComponent : function()
	{
		Ext.apply(this, {
			store :{
				root: {
              		expanded: true
	            },
	            proxy: {
	                type : 'request',
	                moduleName : 'authenticate',
	                action : 'list'
	            },
	            folderSort: true,
	            sorters: [{
	                property: 'text',
	                direction: 'ASC'
	            }]
	    	},
			columns: [{
                xtype: 'treecolumn', //this is so we know which column will show the tree
                text: 'Task',
                dataIndex: 'key'
            },{
          	    text: 'Fields',
                dataIndex: 'field'
            },{
          	    text: 'type',
                dataIndex: 'type'
            }]
		});
		this.callParent();
		//this.mon(this.store, 'metachange', this.onMetaChange, this);
	},

	/**
     * 
     */
	onMetaChange : function(store, meta)
	{
		//this.reconfigure(store, meta.colModel);
	}
});
