Ext.define('Mongo.view.mongo.DBCollectionTreeListViewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.tree-list',
    onToggleNav : function (button, pressed) {
    	console.log(button);
    },
    onToggleMicro : function(button, pressed)
    {
    	console.log(button);
    }
});