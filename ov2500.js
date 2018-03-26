module.exports = function (RED) {
    function ov2500(config) {
        RED.nodes.createNode(this, config);
        var nde = this;
        var ipaddress = config.ipaddress;
        var login = config.login;
        var password = config.password;

        let OV = require('ale-ov2500-node');
        this.ov = new OV.OV(ipaddress);
        this.ov.login({login: {username: login, password: password}})
            .then(result => {
                console.log("OV login succesful", this.ov.mode);
                this.error(result.fullProductName + " ready");
            }).catch(err => {
            this.error("Could not connect to OV");
        });
    }

    RED.nodes.registerType("ov2500", ov2500);
};