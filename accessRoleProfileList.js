module.exports = function (RED) {
    function roleList(config) {
        RED.nodes.createNode(this, config);
        var nde = this;
        //this.error("Entering wlanclientlist");
        var server = RED.nodes.getNode(config.server);
        this.status({fill:"yellow",shape:"dot",text:"No Access role profiles list retrieved"});

        nde.on('input', function (msg) {
            this.status({fill:"yellow",shape:"dot",text:"Retrieving WLAN client list from OV ..."});
            server.ov.getAllAccessRoleProfileList().then((result)=> {
                console.log("Retrieved %d Access role profiles list from OV", result.length);
                this.status({fill:"green",shape:"dot",text:"Retrieved Access role profiles list from OV:" + result.length});
                msg.payload = result;
                this.send(msg);
            }).catch(err=>{
                console.log("Error retrieving Access role profiles list from OV", err);
                this.status({fill:"red",shape:"dot",text:"Error retrieving Access role profiles list"});
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

    RED.nodes.registerType("ov2500-accessroleprofilelist", roleList);
};