module.exports = function(RED) {
    function IRemoconNode(config) {
        RED.nodes.createNode(this,config);
        this.host=config.host;
        var node = this;
        console.log(this.host);
        this.on('input', function(msg) {
            var iRemocon = new require('iremocon');
            var iremo = new iRemocon(node.host);
            iremo.send('se', function(err, msg2) {
               if (err) {
                 console.error(err.code, err.error, err.detail);
                 // e.g. 003 受信エラー 不正なリモコンデータを受信した
                 return;
               }
               //console.log(msg);
               // e.g. ic;ok
               msg.payload=msg2;
               node.send(msg);
            }); 
        });
    }
    RED.nodes.registerType("iRemocon",IRemoconNode);

    function IRemoconCtrlNode(config) {
        RED.nodes.createNode(this,config);
        this.host=config.host;
        this.signal=config.signal;
        var node = this;
        //console.log(this.host);
        //console.log(this.signal);
        this.on('input', function(msg) {
            var iRemocon = new require('iremocon');
            var iremo = new iRemocon(node.host);
            iremo.is(node.signal, function(err, msg2) {
               if (err) {
                 console.error(err.code, err.error, err.detail);
                 // e.g. 003 受信エラー 不正なリモコンデータを受信した
                 return;
               }
               //console.log(msg);
               // e.g. ic;ok
               msg.payload=msg2;
               node.send(msg);
            });
        });
    }
    RED.nodes.registerType("iRemoconCtrl",IRemoconCtrlNode);

    function IRemoconSignalSelectionNode(config) {
        RED.nodes.createNode(this,config);
        this.host=config.host;
        this.signal=config.signal;
        var node = this;
        //console.log(this.host);
        //console.log(this.signal);
        this.on('input', function(msg) {
            var iRemocon = new require('iremocon');
            var iremo = new iRemocon(node.host);
            iremo.is(node.signal, function(err, msg2) {
               if (err) {
                 console.error(err.code, err.error, err.detail);
                 // e.g. 003 受信エラー 不正なリモコンデータを受信した
                 return;
               }
               //console.log(msg);
               // e.g. ic;ok
               msg.payload=msg2;
               node.send(msg);
            });
        });
    }
    RED.nodes.registerType("iRemoconSignalSelection",IRemoconSignalSelectionNode);
}
