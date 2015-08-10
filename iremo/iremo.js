module.exports = function(RED) {
    function IremoNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        this.on('input', function(msg) {
            //msg.payload = msg.payload.toLowerCase();
    var iRemocon = new require('iremocon');
    var iremo = new iRemocon('192.168.1.90');
    //var iRemocon = new require('iremocon');

    //var ips = []
    //for (var i = 1; i < 255; ++i) {
    //    ips.push('192.168.1.' + i);
    //}
    //iRemocon.search(ips, function(ip) {
    //    var iremocon = new iRemocon(ip);
    //    this.log(iremocon.se());
    //    msg.hoge = iremocon.se();
    //});
            iremo.setTimeout(3000);
            iremo.setIP('192.168.1.90');
            //iremo.send('se'));
            iremo.send('se', function(err, msg) {
               if (err) {
                 console.error(err.code, err.error, err.detail);
                 // e.g. 003 受信エラー 不正なリモコンデータを受信した
                 return;
               }
               //console.log(msg);
               msg.payload = msg;
                node.send(msg);
               // e.g. ic;ok
            }); 
        });
    }
    RED.nodes.registerType("iremo",IremoNode);
}
