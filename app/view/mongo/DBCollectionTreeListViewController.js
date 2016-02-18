Ext.define('Mongo.view.mongo.DBCollectionTreeListViewController', {
    extend: 'Ext.app.ViewController',

    /**
     * 
     */
    alias: 'controller.tree-list',

    /**
     * 
     */
    onToggleNav : function (button, pressed) {
    	console.log(button);
    },

    /**
     * 
     */
    onToggleMicro : function(button, pressed)
    {
    	console.log(button);
    },

    /**
     * Event handler triggered when open item was clicked from context menu.
     */
    onOpenClick : function(button, event, fnName)
    {
        var record = button.record;
        var recordId = record.getPath().split("/",3)[2];
        var parentNode = record.getTreeStore().getNodeById(recordId);

        
        console.log(parentNode);
    },

    onButtonClick : function(button, event, fnName)
    {
         var treelist = this.lookupReference('treelist'),
            ct = treelist.ownerCt;

        treelist.setMicro(true);
        this.oldWidth = ct.width;
        ct.setWidth(44);
    }
});