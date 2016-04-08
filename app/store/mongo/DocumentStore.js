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
     * @constructor
     * @param {Object} config Configuration object
     */
    constructor : function(config)
    {
        config = config || {};
        Ext.applyIf(config, {
            id: 'documentStore',
            root: {
                children : []
            },
            model : 'Mongo.model.Role',
            proxy: {
                type : 'request',
                moduleName : 'documentlistmodule',
                action : 'list',
                writer : {
                    rootProperty : 'items'
                },
                reader: {
                    totalProperty: 'total'
                },
                noCache: false
            }
        });
        this.callParent(arguments);
        this.on('load', this.onStoreLoad , this);
    },

    /**
     * Event handler Triggered when @link{Mongo.store.mongo#DocumentStore Document store} gets load.
     */
    onStoreLoad : function(store, records, successful, operation, node, eOpts)
    {
        this.totalCount = operation.getResultSet().getTotal();
    },

    /**
     * Function used to get the information of total number 
     * of record in @link{Mongo.store.mongo#DocumentStore Document store}.
     * @return number which indicate total number of 
     * record in @link{Mongo.store.mongo#DocumentStore Document store}.
     */
    getTotalCount: function()
    {
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
    }, 

    /**
     *
     */
    getRemovedRecords : function()
    {
        this.callParent();
        var m = [];
        Ext.each(this.removedNodes , function(node){
            if(node.get('lastParentId') === 'root') {
                m.push(node);
            }
        }, this);
        this.removedNodes = m;
        return this.removedNodes;
    }

});
