Ext.define('Mongo.view.mongo.Request', {
    extend: 'Ext.data.proxy.Ajax',

    alias : 'proxy.request',
    constructor : function(config)
    {
    	config = config || {};
    	this.callParent(config);
    },
    actionMethods: {
        read: 'POST'
    },
    url: 'server/class.mongo.php',
    paramsAsJson: true,
    reader: {
        type: 'json',
        root: 'children'
    },

    buildRequest: function(operation) {
        request = this.callParent(arguments);
        request.setParams({
        	zarafa : {
	        	authenticate : {
		    		 list : request.getParams()
		     	}
	     	}
	     });
        return request;
    }
});
