module.exports = function (RED) {
    function authRecordList(config) {
        RED.nodes.createNode(this, config);
        var nde = this;
        //this.error("Entering wlanclientlist");
        var server = RED.nodes.getNode(config.server);
        this.status({fill:"yellow",shape:"dot",text:"No auth record list retrieved"});

        nde.on('input', function (msg) {
            this.status({fill:"yellow",shape:"dot",text:"Retrieving auth record list from OV ..."});
            server.ov.getAuthRecordList().then((result)=> {
                console.log("Retrieved %d auth record from OV", result.length);
                this.status({fill:"green",shape:"dot",text:"Retrieved auth records from OV:" + result.length});
                msg.payload = result;
                this.send(msg);
            }).catch(err=>{
                console.log("Error retrieving auth record list from OV", err);
                this.status({fill:"red",shape:"dot",text:"Error retrieving auth record list"});
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

    RED.nodes.registerType("ov2500-authrecordlist", authRecordList);
};