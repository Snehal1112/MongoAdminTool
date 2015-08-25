Ext.define('Mongo.controller.mongo.DBContentPanelController', {
    extend : 'Ext.app.ViewController',
    alias: 'controller.dbcontentpanelcontroller',

    onLoginClick : function(button, event)
    {
    	var props = {};
    	props['userid'] = this.lookupReference('userid').getValue();
    	props['password'] = this.lookupReference('password').getValue();
    	props['access'] = 1;
    	var success = this.doRequest(props);
		//if(success == true){
			this.getView().destroy();
		//}
    },

    doRequest : function(props)
    {
		var success = false;
    	zarafaTag = {
			'zarafa' : {}
		};
		zarafaTag.zarafa['authenticate'] = {};
		zarafaTag.zarafa['authenticate']['check'] = props;
		Ext.Ajax.request({
			url: 'server/class.mongo.php',
		    method : "POST",
		    headers: {
		        'Content-Type': 'application/json'
		    },
		    jsonData: zarafaTag,
		    reader: {
	            type: 'json',
	            rootProperty: 'data'
			},
		    useDefaultXhrHeader : false,
		    withCredentials: true,                
		    success : function(response) {
				success = true;
		    },
		    failure : function(response) {
		        var respObj = Ext.JSON.decode(response.responseText);
		        Ext.Msg.alert("Error", respObj.status.statusMessage);
		    }
		});
		return success;
    }
});
