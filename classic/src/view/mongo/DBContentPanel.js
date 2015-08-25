
Ext.define('Mongo.view.mongo.DBContentPanel', {
    extend: 'Ext.window.Window',

    xtype: 'dbcontentpanel',

    requires : [
        'Mongo.controller.mongo.DBContentPanelController'
    ],
    controller: 'dbcontentpanelcontroller',
    layout : 'form',
    fbar : [{
        text : 'Login',
        handler : 'onLoginClick'
    },{
        text : 'Cancel',
        handler : 'onCalncelClick'
    }],
    items : [{
        xtype : 'textfield',
        emptyText : 'User ID',
        reference : 'userid',
        hideLabel : true
    },{
        xtype : 'textfield',
        emptyText : 'Password',
        reference : 'password',
        hideLabel : true
    }, {
        xtype : 'combo',
        reference : 'DBCombo',
        store : Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data : [
                {"abbr":"AL", "name":"Alabama"},
                {"abbr":"AK", "name":"Alaska"},
                {"abbr":"AZ", "name":"Arizona"}
                //...
            ]
        }),
        queryMode: 'local',
        displayField: 'name',
        valueField: 'abbr',
        hidden : true
    }]

    /*controller: 'main',
    viewModel: 'main',
    */
});
