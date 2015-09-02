Ext.define('Mongo.store.mongo.DocumentStore', {

    /**
     * 
     */
    extend: 'Ext.data.TreeStore',

    /**
     * 
     */
    alias: 'store.documentstore',

    /**
     * 
     */
    config : {

        /**
         * 
         */
        database : undefined,

        /**
         * 
         */
        collection : undefined
    },

    /**
     * 
     */
    constructor : function(config)
    {
        config = config || {};
        Ext.applyIf(config, {
            id: 'simpsonsStore',
            root: {
                children : []
            },
            proxy: {
                type : 'request',
                moduleName : 'authenticate',
                action : 'list',
                reader: {
                    totalProperty: 'total'
                }
            }
        });
        this.callParent(arguments);
        this.on('load', this.onStoreLoad , this);
    },

    /**
     * 
     */
    onStoreLoad : function(store, records, successful, operation, node, eOpts)
    {
        this.totalCount = operation.getResultSet().getTotal();
    },

    /**
     * 
     */
    getTotalCount: function() {
        return this.totalCount || this.getCount();
    },

    /**
     * 
     */
    load : function(node)
    {
        var options = {};
        options['params'] = {};

        if(Ext.isDefined(node)){
            Ext.apply(options['params'], {
                'page' : node.page,
                'start' : node.start,
                'limit' : node.limit,
                'addRecords' : node.addRecords
            });
        }

        Ext.apply(options['params'], {
            'database' : this.getDatabase(),
            'collection' : this.getCollection()
        });

        this.callParent([options]);
    }

});
