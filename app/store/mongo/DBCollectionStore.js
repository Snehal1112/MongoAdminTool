Ext.define('Mongo.store.mongo.DBCollectionStore', {
    extend: 'Ext.data.Store',

    alias: 'store.dbcollectionstore',
    root: {
        text: 'Ext JS',
        id: 'src',
        expanded: true
    },
    proxy: {
        type: 'ajax',
        url: 'server/class.mongo.php',
        reader: {
            type: 'json',
            rootProperty: 'items'
        },
        noCache: false
    }
});
