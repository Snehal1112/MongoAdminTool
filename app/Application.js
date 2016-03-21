Ext.ns('Mongo');

Ext.apply(Mongo, {
    /**
     * 
     */
    isReady : false,
    name: 'Mongo',
    readyEvent : new Ext.util.Event([]),
    onReady : function(fn, scope, options)
    {
        this.readyEvent.addListener(fn, this, options);

        // If the environment is already ready, can
        // should call fireReady again to fire the
        // just registered event.
        if (this.isReady) {
            this.fireReady();
        }
    },

    fireReady : function()
    {
        this.isReady = true;
        this.readyEvent.fire();
        this.readyEvent.clearListeners();
    },

    launch: function () {
        container = new Mongo.view.core.Container();
        Mongo.fireReady();
        container.getMainPanel();
    }
});

Ext.application(Mongo);