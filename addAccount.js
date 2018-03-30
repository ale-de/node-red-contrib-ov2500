module.exports = function (RED) {
    function addAccount(config) {
        RED.nodes.createNode(this, config);
        var nde = this;
        var server = RED.nodes.getNode(config.server);
        this.status({fill:"yellow",shape:"dot",text:"No account added to OV"});

        nde.on('input', function (msg) {
            let params = msg.ovparams;
            console.log("Adding acc to ov", params);
            this.status({fill:"yellow",shape:"dot",text:"Adding account to OV ..."});
            server.ov.addAccount(params.usr,params.pwd,params.profile,params.policy).then((result)=> {
                console.log("Added auth record to OV");
                this.status({fill:"green",shape:"dot",text:"Added account to OV"});
                msg.payload = result;
                this.send(msg);
            }).catch(err=>{
                console.log("Error adding account to OV", err);
                this.status({fill:"red",shape:"dot",text:"Error adding account to OV"});
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

    RED.nodes.registerType("ov2500-addaccount", addAccount);
};