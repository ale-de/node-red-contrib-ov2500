module.exports = function (RED) {
    function devices(config) {
        RED.nodes.createNode(this, config);
        var nde = this;
        this.error("Entering devicelist");
        var server = RED.nodes.getNode(config.server);
        this.status({fill:"yellow",shape:"dot",text:"No devices retrieved"});

        nde.on('input', function (msg) {
            this.status({fill:"yellow",shape:"dot",text:"Retrieving devices from OV ..."});
            server.ov.getDevices().then((result)=> {
                console.log("Retrieved %d devices from OV", result.length);
                this.status({fill:"green",shape:"dot",text:"Retrieved devices from OV:" + result.length});
            }).catch(err=>{
                console.log("Error retrieving devices from OV", err);
                this.status({fill:"red",shape:"dot",text:"Error retrieving devices"});
            });

        });
        nde.on('close', function (removed, done) {
            if (removed) {
                // This node has been deleted
            } else {
                // This node is being restarted
            }
            done();
        });
    }

    RED.nodes.registerType("ov2500-devices", devices);
};