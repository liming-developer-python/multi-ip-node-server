const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const { iotDeviceListnerBuilder } = require('./iot-device-listener-builder');
const bodyParser = require('body-parser')

app.set('views', __dirname);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: 'application/*+json' }))

let server_data = [{idx: 1, controllerIP: '127.0.0.1', controllerPORT: 3000}]
let createdIpIntances = [];

exports.livetightening = (req, res) => {
    _livetightening(res, req);
};

const _livetightening = (req, res) => {
    server_data.forEach(ip => {
        try {
            console.log(`creating connection for ${ip.controllerIP}:${ip.controllerPORT}`)
            let idlb = new iotDeviceListnerBuilder(ip.controllerPORT, ip.controllerIP);
            let idl = idlb.build();
            createdIpIntances.push(idl);
        }
        catch (err) {
            console.error(`Error in making connection for ${ip.controllerIP}:${ip.controllerPORT}`, err);
        }
    });

    return createdIpIntances;
};

_livetightening();

app.get('/', function(req, res) {
    console.log(server_data)
    res.render(path.join(__dirname, 'index.ejs'), { serverData: server_data })
});

app.post('/server_add', function (req, res) {
    console.log(req.body);
    server_data.push({ idx: server_data.length + 1, controllerIP: req.body.ip_address, controllerPORT: req.body.port_number});
    let new_server_info = new iotDeviceListnerBuilder(req.body.ip_address, req.body.ip_address);
    let new_server = new_server_info.build();
    createdIpIntances.push(new_server);
    res.redirect('/');
});

app.post('/server_remove', function (req, res) {
    for (var i = 0; i < server_data.length; i++) {
        if (server_data[i].idx == req.body.idx)
        {
            for (var j = 0; j < createdIpIntances.length; j++) {
                if (createdIpIntances[j].controllerIp == server_data[i].controllerIP && createdIpIntances[j].controllerPort == server_data[i].controllerPORT){
                    createdIpIntances[j].unsubscribe("lastTightening", (err, data) => {
                        if (err) {
                            console.log("Error on unsubscribing to ", createdIpIntances[j].controllerIp, createdIpIntances[j].controllerPort, err);
                            return;
                        }

                        console.log("Unsubscribed to ", createdIpIntances[j].controllerIp, createdIpIntances[j].controllerPort);
                    });
                }
            }
            server_data.splice(i , 1);
        }
    }
    res.redirect('/');
});

app.listen(port, function () {
    app.use(express.static(path.join(__dirname, '/assets')));
    console.log(`Example app listening on port ${port}`);
});

