const { iotDeviceLister } = require('./iot-device-listener');
class iotDeviceListnerBuilder {

    constructor(controllerPort, controllerIp) {
        this.controllerIp = controllerIp;
        this.controllerPort = controllerPort;
        this.optsSessionControl = {
            //Configuring Session Control
            defaultRevisions: undefined,  // {"mid": rev, "mid": rev}
            linkLayerActivate: undefined, // true activate / false not activate / undefined autoNegotiation
            genericMode: undefined,           // true activate / false ou undefined not activate
            keepAlive: 10000,             // Number, default 10000
            //Configuring LinkLayer
            rawData: false,               // true activate / false ou undefined not activate
            disableMidParsing: {}, // true activate / false ou undefined not activate
            timeOut: 3000,                // Number, default 3000
            retryTimes: 3                 // Number, default 3
        };
    }

    build() {
        return new iotDeviceLister(this.controllerPort, this.controllerIp);
    }
}


module.exports = {
    iotDeviceListnerBuilder: iotDeviceListnerBuilder
};