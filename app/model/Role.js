Ext.define('Mongo.model.Role', {
    extend: 'Ext.data.TreeModel',
    idProperty : 'key',
    fields: [{
        name: 'key', 
        type: 'string'
    },{
        name: 'field',
        type: 'string'
    },{
        name: 'iconCls',
        type: 'string',
        defaultValue: null,
        persist: true 
    },{
        name: 'type',
        type: 'string'
    }]
});