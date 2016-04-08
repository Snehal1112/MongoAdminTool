Ext.define('Mongo.view.mongo.Request', {
    /**
     *
     */
    extend: 'Ext.data.proxy.Ajax',

    /**
     *
     */
    alias : 'proxy.request',
    
    /**
     *
     */
    constructor : function(config)
    {
    	config = config || {};
        Ext.applyIf(config,{
            action : config.action,
            url: 'server/class.mongo.php',
            actionMethods: {
                read: 'POST'
            },
            headers: {
                'Content-Type': 'application/json'
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

    doRequest : function(operation) {
        var me = this,
            writer  = me.getWriter(),
            request = me.buildRequest(operation),
            method  = me.getMethod(request),
            jsonData, params;
            
        if (writer && operation.allowWrite()) {
            request = writer.write(request);
        }
        
        request.setConfig({
            binary              : me.getBinary(),
            headers             : me.getHeaders(),
            timeout             : me.getTimeout(),
            scope               : me,
            callback            : me.createRequestCallback(request, operation),
            method              : method,
            useDefaultXhrHeader : me.getUseDefaultXhrHeader(),
            disableCaching      : false // explicitly set it to false, ServerProxy handles caching
        });
        
        if (method.toUpperCase() !== 'GET' && me.getParamsAsJson()) {
            params = request.getParams();

            if (params) {
                jsonData = request.getJsonData();
                if (jsonData) {
                    this.moduleName = "documentitemmodule";
                    this.action = request.getAction();
                    jsonData = this.buildParams(jsonData);
                } else {
                    jsonData = this.buildParams(params);
                }
                request.setJsonData(jsonData);
                request.setParams(undefined);
            }
        }
        
        if (me.getWithCredentials()) {
            request.setWithCredentials(true);
            request.setUsername(me.getUsername());
            request.setPassword(me.getPassword());
        }
        return me.sendRequest(request);
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
