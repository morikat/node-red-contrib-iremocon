module.exports = function(RED) {
    function IremoNode(config) {
        RED.nodes.createNode(this,config);
        this.host=config.host;
        var node = this;
        console.log(this.host);
        this.on('input', function(msg) {
            var iRemocon = new require('iremocon');
            //var iremo = new iRemocon('192.168.1.90');
            //var ipadd= msg;
            //console.log(ipadd);
            var iremo = new iRemocon(node.host);
            iremo.send('se', function(err, msg) {
               if (err) {
                 console.error(err.code, err.error, err.detail);
                 // e.g. 003 受信エラー 不正なリモコンデータを受信した
                 return;
               }
               //console.log(msg);
               var msg2 = { payload: msg };
               node.send(msg2);
               //msg.payload = msg2;
               //node.send(msg);
               // e.g. ic;ok
            }); 
        });
    }
    RED.nodes.registerType("iremo",IremoNode);
}
