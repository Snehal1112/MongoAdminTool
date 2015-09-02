Ext.define('Mongo.view.mongo.Request', {
    extend: 'Ext.data.proxy.Ajax',

    alias : 'proxy.request',
    constructor : function(config)
    {
    	config = config || {};
        Ext.applyIf(config,{
            action : config.action,
            url: 'server/class.mongo.php',
            actionMethods: {
                read: 'POST'
            },
            paramsAsJson: true,
            reader: {
                type: 'json',
                rootProperty: 'children'
            }
        });
        this.callParent(arguments);
    },

    /**
     * Build the request 
     */
    buildRequest: function(operation) {
        request = this.callParent(arguments);
        var params = this.buildParams(request.getParams());

        request.setParams(params);
        return request;
    },

    /**
     * Build the request parameter 
     */
    buildParams : function(requestParams)
    {
        this.reset();
        mongoTag.mongo[this.moduleName] = {};
        mongoTag.mongo[this.moduleName][this.action] = {};
        mongoTag.mongo[this.moduleName][this.action] = requestParams;
        return mongoTag;
    },

    /**
     * reset the paramert of the request 
     */
    reset : function()
    {
        mongoTag = {
            'mongo' : {}
        };
    }
});
