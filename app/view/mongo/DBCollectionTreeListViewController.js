Ext.ns('Mongo.view.mongo');
Ext.define('Mongo.view.mongo.DBCollectionTreeListViewController', {
	extend: 'Ext.app.ViewController',

	/**
	 *
	 */
	alias: 'controller.tree-list',

	/**
	 * Event handler triggered when open item was clicked from context menu.
	 */
	onOpenClick : function(button, event, fnName)
	{
		var obj = {};
		Ext.each(button.records , function(record) {
			var recordId = record.getPath().split("/",3)[2];
			var parentNode = record.getTreeStore().getNodeById(recordId);

			obj[parentNode.getData().key] = {};
			obj[parentNode.getData().key] = this.composeObj(parentNode);
		}, this);
		jsonObj = JSON.stringify(obj, null, 4);

		Ext.create({
			xtype: 'messagecontentpanel',
			jsonObj : jsonObj
		});
	},

	/**
	 *
	 */
	composeObj : function(node)
	{
		var obj = {};
		var childNodes = node.childNodes;
		Ext.each(childNodes, function(childNode) {
			if(childNode.hasChildNodes()) {
				obj[childNode.getData().key] = {};
				obj[childNode.getData().key] = this.composeObj(childNode);
			} else {
				obj[childNode.getData().key] = childNode.getData().field;
			}
		}, this);
		return obj
	},

	/**
	 * Event handler triggered when open item was clicked from context menu.
	 */
	onDeleteClick : function(button, event, fnName)
	{
		var obj = {};
		Ext.each(button.records , function(record) {
			var recordId = record.getPath().split("/",3)[2];
			var parentNode = record.getTreeStore().getNodeById(recordId);
			parentNode.drop();
		}, this);
		var store = this.getViewModel().get('documentStore');

		/**
		 * Fixme : move this code to proper place so we can reuse this code for
		 * create, update and delete as well.
		 */
		var options = {};
		options.params = {};
		Ext.apply(options.params, {
			collection: store.getCollection(),
			database : store.getDatabase()
		});

		store.sync(options);
	},

	/**
	 *
	 */
	onToggleMicro : function(button, event)
	{
		 var treelist = this.lookupReference('treelist'),
			ct = treelist.ownerCt ,
			refs = this.getReferences(),
			collapsing = !treelist.getMicro(),
			new_width = collapsing ? 44 : 166;
		refs.senchaLogo.animate({dynamic: true, to: {width: new_width}});
		if(collapsing) {
			ct.setWidth(new_width);
			treelist.setMicro(true);
		} else {
			ct.setWidth(new_width);
			treelist.setMicro(false);
		}
	}
});