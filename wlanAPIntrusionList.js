module.exports = function (RED) {
    function apIntrusionList(config) {
        RED.nodes.createNode(this, config);
        var nde = this;
        //this.error("Entering wlanapintrusionlist");
        var server = RED.nodes.getNode(config.server);
        this.status({fill:"yellow",shape:"dot",text:"No WLAN AP Intrusion list retrieved"});

        nde.on('input', function (msg) {
            this.status({fill:"yellow",shape:"dot",text:"Retrieving WLAN client list from OV ..."});
            server.ov.getWlanAPIntrusionList(server.ov.mode).then((result)=> {
                console.log("Retrieved %d WLAN Intrusive APs from OV", result.length);
                this.status({fill:"green",shape:"dot",text:"Retrieved WLAN Intrusive APs from OV:" + result.length});
                msg.payload = result;
                this.send(msg);
            }).catch(err=>{
                console.log("Error retrieving WLAN Intrusive APs list from OV", err);
                this.status({fill:"red",shape:"dot",text:"Error retrieving WLAN Intrusive APs list"});
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

    RED.nodes.registerType("ov2500-wlanapintrusionlist", apIntrusionList);
};
