Ext.ns('Mongo.view.mongo');
Ext.define('Mongo.view.mongo.MailContext', {
	//mixins: ['Ext.mixin.Observable'],
	extend : 'Mongo.view.core.Context',
	requires :['Mongo.view.core.Container'],
	config: {
		name: ''
	},
	constructor: function (config) {

		Mongo.view.mongo.MailContext.superclass.constructor.call(this, config);
		console.log('c')
	}
});

Mongo.onReady(function(){
	container.registerContext(new Mongo.view.core.ContextMetaData({
		name : 'mail',
		displayName: 'Mail',
		allowUserVisible : false,
		pluginConstructor : Mongo.view.mongo.MailContext
	}));
});