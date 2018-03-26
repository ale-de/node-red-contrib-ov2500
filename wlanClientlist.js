module.exports = function (RED) {
    function clientList(config) {
        RED.nodes.createNode(this, config);
        var nde = this;
        this.error("Entering wlanclientlist");
        var server = RED.nodes.getNode(config.server);
        this.status({fill:"yellow",shape:"dot",text:"No WLAN client list retrieved"});

        nde.on('input', function (msg) {
            this.status({fill:"yellow",shape:"dot",text:"Retrieving WLAN client list from OV ..."});
            server.ov.getWlanClientList(server.ov.mode).then((result)=> {
                console.log("Retrieved %d WLAN client list from OV", result.length);
                this.status({fill:"green",shape:"dot",text:"Retrieved WLAN Client list from OV:" + result.length});
            }).catch(err=>{
                console.log("Error retrieving WLAN Client list from OV", err);
                this.status({fill:"red",shape:"dot",text:"Error retrieving WLAN Client list"});
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

    RED.nodes.registerType("ov2500-wlanclientlist", clientList);
};