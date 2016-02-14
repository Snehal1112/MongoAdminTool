Ext.define('Mongo.view.mongo.DBCollectionTreeListViewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.tree-list',
    onToggleNav : function (button, pressed) {
    	console.log(button);
    },
    onToggleMicro : function(button, pressed)
    {
    	console.log(button);
    },

    /**
     * Event handler triggered when open item was clicked from context menu.
     */
    onOpenClick : function()
    {
        console.log('open button is click');
    }
});