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
        var record = button.record;
        var recordId = record.getPath().split("/",3)[2];
        var parentNode = record.getTreeStore().getNodeById(recordId);

        
        console.log(parentNode);
    },

    /**
     * 
     */
    onToggleMicro : function(button, event)
    {
         var treelist = this.lookupReference('treelist'),
            ct = treelist.ownerCt;
        var collapsing = !treelist.getMicro();
        if(collapsing === null) {
            treelist.setMicro(false);
        }
        
        if(!treelist.getMicro()) {
            this.oldWidth = ct.getWidth();
            ct.setWidth(44);
            treelist.setMicro(true);
        } else {
            ct.setWidth(this.oldWidth);
            treelist.setMicro(false);
        }
    }
});