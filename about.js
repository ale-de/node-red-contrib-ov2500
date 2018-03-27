module.exports = function (RED) {
    function about(config) {
        RED.nodes.createNode(this, config);
        var nde = this;
        this.error("Entering about");
        var server = RED.nodes.getNode(config.server);
        this.status({fill:"yellow",shape:"dot",text:"No Info"});

        nde.on('input', function (msg) {
            this.status({fill:"yellow",shape:"dot",text:"Retrieving OV info ..."});
            server.ov.about().then((result)=> {
                this.status({fill:"green",shape:"dot",text:result.fullProductName});
                msg.payload = result;
                this.send(msg);
            }).catch(err=>{
                console.log("Error retrieving OV info", err);
                this.status({fill:"red",shape:"dot",text:"Error retrieving OV Info"});
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

    RED.nodes.registerType("ov2500-about", about);
};