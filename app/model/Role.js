Ext.define('Mongo.model.Role', {
    extend: 'Ext.data.TreeModel',
    fields: [{
        name: 'key', 
        type: 'string'
    }, {
        name: 'field',
        type: 'string'
    }, {
        name: 'type',
        type: 'string'
    }]
});