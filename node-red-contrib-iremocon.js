module.exports = function(RED) {
    function IRemoconNode(config) {
        RED.nodes.createNode(this,config);
        this.host=config.host;
        var node = this;
        console.log(this.host);
        this.on('input', function(msg) {
            var iRemocon = new require('iremocon');
            var iremo = new iRemocon(node.host);
            iremo.send('se', function(err, msg) {
               if (err) {
                 console.error(err.code, err.error, err.detail);
                 // e.g. 003 受信エラー 不正なリモコンデータを受信した
                 return;
               }
               //console.log(msg);
               // e.g. ic;ok
               var msg2 = { payload: msg };
               node.send(msg2);
            }); 
        });
    }
    RED.nodes.registerType("iRemocon",IRemoconNode);
}
