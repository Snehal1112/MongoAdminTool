Ext.define('Ext.data.reader.DBReader', {
    extend: 'Ext.data.reader.Json',
    alias : 'reader.dbreader'
    /*read: function(response) {
        var staticStuff,
            responseArr;

        // Static stuff
        staticStuff = [{name: 'some static user', id:1}, {name: 'another user', id:2}];
        // extract response
        responseArr = Ext.decode(response.responseText);
        // shove them together
        //responseArr.concat(staticStuff);
        // read
        this.readRecords(responseArr);
    }*/
})